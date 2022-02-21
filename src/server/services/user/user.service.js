const path = require('path');
const { Op, fn, where, col } = require('sequelize');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { escapeWildcards } = require(path.join(process.cwd(), 'src/server/utility/misc'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getUsers() {
    const users = await UserModel.findAll();
    return users; 
}

async function getUser(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ where: { id }, include: ProjectModel });

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    return Return.service(user);
}

async function getUserByEmail(email) {
    if (!email) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ 
        where: { email: where(fn('lower', col('email')), fn('lower', email)) }
    });

    if (!user) return Return.service(null, [{ message: 'User with the email does not exist.' }]);

    return Return.service(user);
}

async function createUser(data) {
    if (!data) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const { firstName, lastName, email, password } = data;

    if (!firstName || !lastName || !email || !password) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password
    });

    if (!user) return Return.service(null, [{ message: 'Could not create user.' }]);

    return Return.service(user);
}

async function searchUsers(query, notInProject) {
    if (!query) return [];

    const queryTokens = query.split(' ');

    const escapedQueryTokens = queryTokens.map(token => escapeWildcards(token));

    const where = {
        [Op.or]: escapedQueryTokens
            .reduce((conditions, token) => { 
                conditions.push({ email: { [Op.iLike]: `%${token}%` } });
                conditions.push({ first_name: { [Op.iLike]: `%${token}%` } });
                conditions.push({ last_name: { [Op.iLike]: `%${token}%` } });
                return conditions;
            }, [])
    };

    const projectFilter = {};

    if (notInProject) {
        projectFilter.id = { [Op.not]: notInProject }
    }

    let users = await UserModel.findAll({
        where, 
        include: { model: ProjectModel }
    });
    
    if (notInProject) {
        users = users
            .filter(user => !user.projects
                .find(project => project.id === notInProject)
            );
    }

    return users;
}

async function updateUser(id, data) {
    if (!id) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ where: { id } });

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    await user.update({ 
        first_name: data.firstName, 
        last_name: data.lastName,
        email: data.email
    });

    return Return.service(user);
}

async function updateUserPassword(id, newPassword) {
    if (!id || !newPassword) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ where: { id } });

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    await user.update({ password: newPassword });

    return Return.service(user);
}

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.searchUsers = searchUsers;
exports.updateUser = updateUser;
exports.updateUserPassword = updateUserPassword;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;