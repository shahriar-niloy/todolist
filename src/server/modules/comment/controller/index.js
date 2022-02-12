const path = require('path');

const CommentService = require(path.join(process.cwd(), 'src/server/services/comment'));
const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const ProjectService = require(path.join(process.cwd(), 'src/server/services/project'));
const NotificationService = require(path.join(process.cwd(), 'src/server/services/notification'));
const { CommentViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function deleteComment(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    const [comment, commentErr] = await CommentService.getComment(id);

    if (commentErr) {
        commentErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!comment) {
        errorResponse.addError('Invaid comment id', '');
        return res.status(400).json(errorResponse);
    }

    const [task, taskErr] = await TaskService.getTask(comment.task_id);
    
    if (taskErr) {
        taskErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!task) {
        errorResponse.addError('Task not found.', '');
        return res.status(400).json(errorResponse);
    }

    const [hasPermissionToDeleteComment, permissionErr] = await ProjectService.hasPermission(task.project_id, req.user.id, 'COMMENT', 'DELETE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToDeleteComment) {
        errorResponse.addError('The user does not have the permission to create a comment in the task.', '');
        return res.status(403).json(errorResponse);
    }

    const [, errors] = await CommentService.deleteComment(id);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = CommentViewModels.comment(comment);

    res.json(successResponse);
}

async function createComment(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const {
        comment,
        task_id, 
        parent_id,
        mentioned_users
    } = req.body;

    const userID = req.user.id;

    const [task, taskErr] = await TaskService.getTask(task_id);

    if (taskErr) {
        taskErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    const [hasPermissionToCreateComment, permissionErr] = await ProjectService.hasPermission(task.project_id, userID, 'COMMENT', 'CREATE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToCreateComment) {
        errorResponse.addError('The user does not have the permission to create a comment in the task.', '');
        return res.status(403).json(errorResponse);
    }

    const [createdComment, errors] = await CommentService.createComment({ 
        comment, 
        taskID: task.id, 
        userID,
        parentID: parent_id
    });

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    const [, notificationErr] = await NotificationService.createCommentMentionNotification(
        createdComment.id, 
        mentioned_users.filter(id => id !== userID), 
        userID
    );
    
    if (notificationErr) {
        notificationErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = CommentViewModels.comment(createdComment);

    res.json(successResponse);
}

exports.createComment = createComment;
exports.deleteComment = deleteComment;