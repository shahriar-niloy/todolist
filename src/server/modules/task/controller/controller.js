const path = require('path');

const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const { TaskViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function createTask(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const {
        name,
        description,
        scheduled_at,
        is_completed,
        order, 
        project_id 
    } = req.body;

    const [task, errors] = await TaskService.createTask({ name, description, scheduled_at, is_completed, order, project_id });

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
        project_id 
    } = req.body;

    const [task, errors] = await TaskService.updateTask({ id, name, description, scheduled_at, is_completed, order, project_id });

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

exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;