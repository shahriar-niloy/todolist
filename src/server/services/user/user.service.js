const path = require('path');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));

async function getUsers() {
    const users = await UserModel.findAll();
    return users; 
}

async function getUser(id) {
    if (!id) return null;

    const user = await UserModel.findOne({ where: { id }, include: ProjectModel });

    return user; 
}

exports.getUsers = getUsers;
exports.getUser = getUser;