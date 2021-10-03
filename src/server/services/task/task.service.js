const path = require('path');
const TaskModel = require(path.join(process.cwd(), 'src/server/models/task.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));
const { TaskViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));

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

async function createTask(data) {
    const {
        name,
        description,
        scheduled_at,
        priority,
        is_completed,
        order, 
        project_id 
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
        project_id 
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

async function bulkUpdateTasks(tasks) {
    if (!tasks) return Return.service(null, [{ message: 'Must provide required paramters.' }]);
    
    if (!Array.isArray(tasks)) return Return.service(null, [{ message: 'Tasks must be of type array.' }]);

    for (task of tasks) await TaskModel.update(task, { where: { id: task.id } });
    
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

exports.getTask = getTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.bulkUpdateTasks = bulkUpdateTasks;
exports.getAllSubtasks = getAllSubtasks;