const path = require('path');
const UserViewModels = require(path.join(process.cwd(), 'src/server/view-models/user.viewmodel'));
const ProjectViewModels = require(path.join(process.cwd(), 'src/server/view-models/project.viewmodel'));
const TaskViewModels = require(path.join(process.cwd(), 'src/server/view-models/task.viewmodel'));
const AttachmentViewModels = require(path.join(process.cwd(), 'src/server/view-models/attachment.viewmodel'));
const CommentViewModels = require(path.join(process.cwd(), 'src/server/view-models/comment.viewmodel'));

exports.UserViewModels = UserViewModels;
exports.ProjectViewModels = ProjectViewModels;
exports.TaskViewModels = TaskViewModels;
exports.AttachmentViewModels = AttachmentViewModels;
exports.CommentViewModels = CommentViewModels;