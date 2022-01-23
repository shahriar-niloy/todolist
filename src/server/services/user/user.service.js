const path = require('path');
const { Op, fn } = require('sequelize');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { escapeWildcards } = require(path.join(process.cwd(), 'src/server/utility/misc'));

async function getUsers() {
    const users = await UserModel.findAll();
    return users; 
}

async function getUser(id) {
    if (!id) return null;

    const user = await UserModel.findOne({ where: { id }, include: ProjectModel });

    return user; 
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

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.searchUsers = searchUsers;