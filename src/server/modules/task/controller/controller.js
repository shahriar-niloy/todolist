const path = require('path');

const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const CommentService = require(path.join(process.cwd(), 'src/server/services/comment'));
const ProjectService = require(path.join(process.cwd(), 'src/server/services/project'));
const NotificationService = require(path.join(process.cwd(), 'src/server/services/notification'));
const { TaskViewModels, AttachmentViewModels, CommentViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));

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

    const [hasPermissionToCreateTask, permissionErr] = await ProjectService.hasPermission(project_id, req.user.id, 'TASK', 'CREATE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToCreateTask) {
        errorResponse.addError('The user does not have the permission to create a task in the project.', '');
        return res.status(403).json(errorResponse);
    }

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

    const [hasPermissionToUpdateTask, permissionErr] = await ProjectService.hasPermission(project_id, req.user.id, 'TASK', 'UPDATE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToUpdateTask) {
        errorResponse.addError('The user does not have the permission to update the tasks of the project.', '');
        return res.status(403).json(errorResponse);
    }

    const [task, taskErrors] = await TaskService.getTask(id);

    if (taskErrors) {
        taskErrors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    const [updatedTask, errors] = await TaskService.updateTask({ id, name, description, scheduled_at, is_completed, order, project_id, priority });

    if (task.is_completed === false && is_completed === true) {
        const [, notificationErr] = await NotificationService.createTaskCompletedNotification(updatedTask.id, req.user.id);
        if (notificationErr) logger.error(notificationErr);
    }

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = TaskViewModels.task(updatedTask);

    res.json(successResponse);
}

async function deleteTask(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    const [task, taskErr] = await TaskService.getTask(id);

    if (taskErr) {
        taskErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    const [hasPermissionToDeleteTask, permissionErr] = await ProjectService.hasPermission(task.project_id, req.user.id, 'TASK', 'DELETE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToDeleteTask) {
        errorResponse.addError('The user does not have the permission to delete the tasks of the project.', '');
        return res.status(403).json(errorResponse);
    }

    const [, errors] = await TaskService.deleteTask(id);

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
    const userID = req.user.id;

    const [tasksDetail, tasksError] = await TaskService.getTasks(userID, { id: tasks.map(task => task.id) });

    if (tasksError) {
        tasksError.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    const projectIDs = [...(new Set(tasksDetail.map(task => task.project_id)))];

    await Promise.all(projectIDs.map(async id => {
        const [hasPermissionToUpdateTask, permissionErr] = await ProjectService.hasPermission(id, userID, 'TASK', 'UPDATE');

        if (permissionErr) {
            permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        }

        if (!hasPermissionToUpdateTask) {
            errorResponse.addError('The user does not have the permission to update the tasks of the project.', '');
        }
    }));

    if (errorResponse.errors.length) {
        return res.status(400).json(errorResponse);
    }

    const markedAsCompleteTasks = tasksDetail.filter(
        task => task.is_completed === false && 
        tasks.find(t => t.id === task.id)?.is_completed === true 
    );

    const [updatedTasks, errors] = await TaskService.bulkUpdateTasks(tasks);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (markedAsCompleteTasks.length) {
        await Promise.all(
            markedAsCompleteTasks.map(async task => {
                const [, notificationErr] = await NotificationService.createTaskCompletedNotification(task.id, req.user.id);
                if (notificationErr) logger.error(notificationErr);
            })
        );
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

async function createTaskAttachment(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const attachmentObject = {
        ...req.body,
        taskID: req.body.task_id,
        data: req.file.buffer,
        fileSize: req.file.size,
        mimetype: req.body.mimetype || req.file.mimetype 
    };

    const [task, taskErr] = await TaskService.getTask(req.body.task_id);

    if (taskErr) {
        taskErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);   
    }

    const [hasPermissionToCreateAttachment, err] = await ProjectService.hasPermission(task.project_id, req.user.id, 'ATTACHMENT', 'UPDATE');

    if (!hasPermissionToCreateAttachment) {
        errorResponse.addError('User does not have the permission to create an attachment in this task.', '');
        return res.status(403).send(errorResponse);
    }

    const [attachment, errors] = await TaskService.createTaskAttachment(attachmentObject);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = AttachmentViewModels.attachment(attachment);

    res.json(successResponse);
}

async function getTaskAttachments (req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const taskID = req.params.id;

    const [attachments, errors] = await TaskService.getTaskAttachments(taskID);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = attachments.map(attachment => AttachmentViewModels.attachment(attachment));

    res.json(successResponse);
}

async function deleteTaskAttachment (req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const attachmentID = req.params.id;

    const [attachment, errors] = await TaskService.deleteTaskAttachment(attachmentID);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = AttachmentViewModels.attachment(attachment);

    res.json(successResponse);
}

async function getTaskComments (req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const taskID = req.params.id;

    const [hasAccess, accessErr] = await TaskService.hasAccessToTask(taskID, req.user.id);

    if (accessErr) {
        accessErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasAccess) return res.status(403).send('User does not have access to the task.');

    const [comments, errors] = await CommentService.getCommentsByTask(taskID);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = comments.map(comment => CommentViewModels.comment(comment));

    res.json(successResponse);
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
exports.getTaskComments = getTaskComments;