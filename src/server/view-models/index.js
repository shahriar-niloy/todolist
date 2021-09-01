const path = require('path');
const UserViewModels = require(path.join(process.cwd(), 'src/server/view-models/user.viewmodel'));
const ProjectViewModels = require(path.join(process.cwd(), 'src/server/view-models/project.viewmodel'));

exports.UserViewModels = UserViewModels;
exports.ProjectViewModels = ProjectViewModels;