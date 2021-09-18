const path = require('path');
const TaskModel = require(path.join(process.cwd(), 'src/server/models/task.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));
const { TaskViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));

async function getTask(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const task = await TaskModel.findOne({ where: { id }});

    if (!task) return Return.service(null, [{ message: 'Task not found.' }]);
    
    return Return.service(task);
}

async function createTask(data) {
    const {
        name,
        description,
        scheduled_at,
        is_completed,
        order, 
        project_id 
    } = data;

    if (!name || !order || !project_id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const project = await ProjectModel.findOne({ where: { id: project_id }});

    if (!project) return Return.service(null, [{ message: 'Project not found.' }]);

    const task = await TaskModel.create({ 
        name, 
        description, 
        scheduled_at, 
        is_completed, 
        order, 
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
        project_id 
    } = data;

    if (!name || !order || !project_id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const project = await ProjectModel.findOne({ where: { id: project_id }});

    if (!project) return Return.service(null, [{ message: 'Project not found.' }]);

    const task = await TaskModel.findOne({ where: { id } });

    if (!task) return Return.service(null, [{ message: 'Task does not exist.' }]);

    await task.update({ 
        name, 
        description, 
        scheduled_at, 
        is_completed, 
        order, 
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

exports.getTask = getTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.bulkUpdateTasks = bulkUpdateTasks;