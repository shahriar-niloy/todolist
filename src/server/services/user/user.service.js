const path = require('path');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));

async function login(email, password) {
    const user = await UserModel.findOne({ 
        where: { email: email.toLowerCase() }
    });

    if (!user || !user.isValidPassword(password)) return;

    return user; 
}

async function getUsers() {
    const users = await UserModel.findAll();
    return users; 
}

exports.login = login;
exports.getUsers = getUsers;