const path = require('path');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));

async function getUsers() {
    const users = await UserModel.findAll();
    return users; 
}

exports.getUsers = getUsers;