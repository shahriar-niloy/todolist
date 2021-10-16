const path = require('path');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));

async function login(email, password) {
    const user = await UserModel.findOne({ 
        where: { email: email.toLowerCase() },
        include: ProjectModel
    });

    if (!user || !user.isValidPassword(password)) return;

    return user; 
}

exports.login = login;