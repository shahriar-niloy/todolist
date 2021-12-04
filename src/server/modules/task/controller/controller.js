const path = require('path');

const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const { TaskViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getTask(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    const [task, errors] = await TaskService.getTask(id);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = TaskViewModels.task(task);

    res.json(successResponse);
}

async function createTask(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const {
        name,
        description,
        scheduled_at,
        is_completed,
        order, 
        priority,
        project_id,
        parent_task_id
    } = req.body;

    const [task, errors] = await TaskService.createTask({ name, description, scheduled_at, is_completed, order, project_id, priority, parent_task_id });

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = TaskViewModels.task(task);

    res.json(successResponse);
}

async function updateTask(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    const {
        name,
        description,
        scheduled_at,
        is_completed,
        order,
        priority, 
        project_id 
    } = req.body;

    const [task, errors] = await TaskService.updateTask({ id, name, description, scheduled_at, is_completed, order, project_id, priority });

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = TaskViewModels.task(task);

    res.json(successResponse);
}

async function deleteTask(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    const [task, errors] = await TaskService.deleteTask(id);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = TaskViewModels.task(task);

    res.json(successResponse);
}

async function bulkUpdateTasks(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const tasks = req.body;

    const [updatedTasks, errors] = await TaskService.bulkUpdateTasks(tasks);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }
    
    successResponse.data = updatedTasks.map(task => TaskViewModels.task(task))
    
    res.json(successResponse);
}

async function getAllSubtasks(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const id = req.params.id;

    const [taskHierarchy, errors] = await TaskService.getAllSubtasks(id);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = TaskViewModels.subtaskHierarchy(taskHierarchy);

    res.json(successResponse);
}

async function getTasks(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const scheduled_date = req.query.scheduled_date;
    const userID = req.user.id;

    const where = {};

    if (scheduled_date) where.scheduled_date = scheduled_date;

    const [tasks, errors] = await TaskService.getTasks(userID, where);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = tasks.map(task => TaskViewModels.task(task));

    res.json(successResponse);
}

exports.getTask = getTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.bulkUpdateTasks = bulkUpdateTasks;
exports.getAllSubtasks = getAllSubtasks;
exports.getTasks = getTasks;