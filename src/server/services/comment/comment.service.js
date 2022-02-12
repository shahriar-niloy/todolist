const path = require('path');
const CommentModel = require(path.join(process.cwd(), 'src/server/models/comment.model'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getCommentsByTask(task_id) {
    if (!task_id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const task = await TaskService.getTask(task_id);

    if (!task) return Return.service(null, [{ message: 'Task not found.' }]);

    const comments = await CommentModel.findAll({ 
        where: { task_id },
        include: [{ as: 'user', model: UserModel }],
        order: [['created_at', 'ASC']]
    });

    return Return.service(comments);
}

async function getComment(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const comment = await CommentModel.findOne({ where: { id } });

    if (!comment) return Return.service(null, [{ message: 'Invalid comment id.' }]);

    return Return.service(comment);
}

async function createComment({ comment, taskID, parentID, userID }) {
    if (!comment || !taskID || !userID) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const commentInstance = await CommentModel.create({ 
        comment, 
        task_id: taskID, 
        parent_id: parentID, 
        user_id: userID
    });

    return Return.service(commentInstance);
}

async function deleteComment(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const comment = await CommentModel.findOne({ where: { id } });

    if (!comment) return Return.service(null, [{ message: 'Invalid comment id.' }]);

    await comment.destroy();

    return Return.service(comment);
}

exports.getComment = getComment;
exports.deleteComment = deleteComment;
exports.getCommentsByTask = getCommentsByTask;
exports.createComment = createComment;