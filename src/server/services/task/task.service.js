const path = require('path');
const { where: Where, fn, col } = require('sequelize');
const AttachmentModel = require('../../models/attachment.model');
const { MAX_ATTACHMENT_SIZE_IN_BYTES } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));

const TaskModel = require(path.join(process.cwd(), 'src/server/models/task.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const UserProjectModel = require(path.join(process.cwd(), 'src/server/models/user_project.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));
const { TaskViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const eventManager = require(path.join(process.cwd(), 'src/server/lib/events'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const { ENUM_ATTACHMENT_TYPES } = require(path.join(process.cwd(), 'src/server/modules/attachment/attachment.constants'));

async function getTask(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const task = await TaskModel.findOne({
        where: { id },
        include: [
            { model: TaskModel, as: "parentTask" },
            { model: TaskModel, as: "subtasks" }
        ]
    });

    if (!task) return Return.service(null, [{ message: 'Task not found.' }]);
    
    return Return.service(task);
}

async function getTasks(user_id, conditions) {
    if (!user_id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    let where = {};

    if (conditions.scheduled_date) {
        where.scheduled_at = Where(fn('DATE', col('task.scheduled_at')), fn('DATE', conditions.scheduled_date));
        delete conditions.scheduled_date;
    }

    const user = await UserModel.findOne({ 
        where: {
            id: user_id
        },
        include: [{
            model: ProjectModel,
            attributes: ['id']
        }],
        attributes: ['id']
    });

    if (!user) return Return.service(null, [{ message: 'User not found.' }]);

    const projectIDs = user.projects.map(project => project.id);

    where = { 
        ...where, 
        ...conditions, 
        project_id: projectIDs 
    };

    const tasks = await TaskModel.findAll({ where });

    return Return.service(tasks);
}

async function createTask(data) {
    const {
        name,
        description,
        scheduled_at,
        priority,
        is_completed,
        order, 
        project_id,
        parent_task_id
    } = data;

    if (!name || !Number.isInteger(order) || !project_id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const project = await ProjectModel.findOne({ where: { id: project_id }});

    if (!project) return Return.service(null, [{ message: 'Project not found.' }]);

    const task = await TaskModel.create({ 
        name, 
        description, 
        scheduled_at: scheduled_at || null, 
        is_completed, 
        order, 
        priority,
        project_id,
        parent_task_id
    });
    
    return Return.service(TaskViewModels.task(task));
}

async function updateTask(data) {
    const {
        id,
        name,
        description,
        scheduled_at,
        is_completed,
        order,
        priority, 
        project_id 
    } = data;

    if (project_id) {
        const project = await ProjectModel.findOne({ where: { id: project_id }});
        if (!project) return Return.service(null, [{ message: 'Project not found.' }]);
    }

    const task = await TaskModel.findOne({ where: { id } });

    if (!task) return Return.service(null, [{ message: 'Task does not exist.' }]);

    await task.update({ 
        name, 
        description, 
        scheduled_at, 
        is_completed, 
        order, 
        priority,
        project_id 
    });
    
    return Return.service(TaskViewModels.task(task));
}

async function deleteTask(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const task = await TaskModel.findOne({ where: { id } });

    if (!task) return Return.service(null, [{ message: 'Task does not exist.' }]);

    await task.destroy();
    
    return Return.service(TaskViewModels.task(task));
}

async function getBulkTasks(taskIDs) {
    if (!taskIDs) return Return.service(null, [{ message: 'Must provide required paramters.' }]);
    
    if (!Array.isArray(taskIDs)) return Return.service(null, [{ message: 'Must provide array of task id.' }]);

    const tasks = await TaskModel.findAll({ where: { id: taskIDs }});

    return Return.service(tasks);
}

async function bulkUpdateTasks(tasks) {
    if (!tasks) return Return.service(null, [{ message: 'Must provide required paramters.' }]);
    
    if (!Array.isArray(tasks)) return Return.service(null, [{ message: 'Tasks must be of type array.' }]);

    const eventName = `bulk_task_update_end_${Math.random()}`;

    eventManager.addEvent(eventName);

    for (const task of tasks) {
        await TaskModel.update(task, { where: { id: task.id }, individualHooks: true, subscribeToEvent: eventName });
    }

    await eventManager.emit(eventName);
    eventManager.removeEvent(eventName);

    const updatedTasks = await TaskModel.findAll({ 
        where: { id: tasks.map(task => task.id) },
        order: [['order', 'ASC']]
    });

    return Return.service(updatedTasks);
}

async function getAllSubtasks(taskID) {
    if (!taskID) Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const [flatSubtaskHierarchy] = await sequelize.query(`
            WITH RECURSIVE t(id, parent_task_id) AS (
                SELECT id, parent_task_id, name, description, scheduled_at, is_completed, "todolist"."tasks".order, project_id, created_at, updated_at 
                FROM "todolist"."tasks" 
                WHERE parent_task_id = $1
            UNION
                SELECT task2.id, task2.parent_task_id, task2.name, task2.description, task2.scheduled_at, task2.is_completed, task2.order, task2.project_id, task2.created_at, task2.updated_at 
                FROM t as task1 , "todolist"."tasks" as task2
                WHERE task2.parent_task_id = task1.id
            )
            SELECT * FROM t;
        `, {
            bind: [taskID]
        }
    );

    const taskSubtaskMap = new Map();

    for (task of flatSubtaskHierarchy) {
        const parent_id = task.parent_task_id;
        taskSubtaskMap.has(parent_id)
            ? taskSubtaskMap.get(parent_id).push(task)
            : taskSubtaskMap.set(parent_id, [task]);
    }

    function createTaskHierarchy(taskID) {
        const children = taskSubtaskMap.get(taskID);
        
        if (!children || !children.length) return null;

        let i = 0;
        for (const child of children) {
            children[i].subtasks = createTaskHierarchy(child.id);
            ++i;
        }
        
        return children;
    }

    const taskHierarchy = createTaskHierarchy(taskID);

    return Return.service(taskHierarchy);
}

async function createTaskAttachment(attachment) {
    if (!attachment) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const { name, type, taskID, data, fileSize, mimetype } = attachment;

    if (!name || !type || !taskID || !data | !fileSize) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    if (!ENUM_ATTACHMENT_TYPES.includes(type)) return Return.service(null, [{ message: 'Invalid attachment type.' }]);

    if (fileSize > MAX_ATTACHMENT_SIZE_IN_BYTES) return Return.service(null, [{ message: 'Attachment too large.' }]);

    const task = await TaskModel.findOne({ where: { id: taskID }});

    if (!task) return Return.service(null, [{ message: 'Invalid task id.' }]);

    const createdAttachment = await AttachmentModel.create({
        name, 
        type,
        task_id: task.id,
        data,
        file_size: fileSize,
        mimetype
    });

    return Return.service(createdAttachment);
}

async function getTaskAttachments(taskID) {
    if (!taskID) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const task = await TaskModel.findOne({ where: { id: taskID }, include: { model: AttachmentModel } });

    if (!task) return Return.service(null, [{ message: 'Invalid task id.' }]);    

    return Return.service(task.attachments);
}

async function deleteTaskAttachment(attachmentID) {
    if (!attachmentID) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const attachment = await AttachmentModel.findOne({ where: { id: attachmentID } });

    if (!attachment) return Return.service(null, [{ message: 'Invalid attachment id.' }]);    

    await attachment.destroy();

    return Return.service(attachment);
}

async function hasAccessToTask(task_id, user_id) {
    if (!task_id || !user_id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const task = await TaskModel.findOne({ where: { id: task_id }});

    if (!task) return Return.service(null, [{ message: 'Task not found.' }]);

    const userProject = await UserProjectModel.findOne({ where: { project_id: task.project_id, user_id } });

    return Return.service(!!userProject);
}

exports.getTask = getTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.bulkUpdateTasks = bulkUpdateTasks;
exports.getAllSubtasks = getAllSubtasks;
exports.getTasks = getTasks;
exports.createTaskAttachment = createTaskAttachment;
exports.getTaskAttachments = getTaskAttachments;
exports.deleteTaskAttachment = deleteTaskAttachment;
exports.getBulkTasks = getBulkTasks;
exports.hasAccessToTask = hasAccessToTask;