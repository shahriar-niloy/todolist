const path = require('path');
const { Op } = require('sequelize');
const { performLogicalAnd } = require(path.join(process.cwd(), 'src/server/utility/misc'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const IconModel = require(path.join(process.cwd(), 'src/server/models/icon.model'));
const TaskModel = require(path.join(process.cwd(), 'src/server/models/task.model'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const UserProjectModel = require(path.join(process.cwd(), 'src/server/models/user_project.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));
const IconService = require(path.join(process.cwd(), 'src/server/services/icon'));

async function getProject(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide project id.' }]);
    
    const project = await ProjectModel.findOne({ 
        where: { id }, 
        include: [{ 
            model: TaskModel
        }, {
            model: IconModel
        }],
        order: [[TaskModel, 'order', 'ASC']] 
    });

    if (!project) return Return.service(null, [{ message: 'Project not found.' }]);

    let projectUsers = await project.getUsers({ attributes: ['id', 'first_name', 'last_name', 'email'] });
    
    projectUsers = projectUsers.map(user => {
        user = {
            ...user.dataValues,
            is_owner: user.user_project.is_owner,  
            can_write: user.user_project.can_write,
            can_read: user.user_project.can_read
        }

        delete user.user_project;
        
        return user;
    });

    project.users = projectUsers;

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);
    
    return Return.service(project);
}

async function createProject({ name, user_id, iconID }) {
    if (!name || !user_id) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const projectWithSameName = await ProjectModel.findOne({ where: { name }});

    if (projectWithSameName) return Return.service(null, [{ message: 'Project with the same name already exists.' }]);

    const [defaultIcon] = await IconService.getIcon({ name: 'tasks' });

    const project = await ProjectModel.create({ name, icon_id: iconID || defaultIcon?.id || null });
    
    await project.addUser(user_id, { through: { is_owner: true } });

    project.users = await project.getUsers();
    
    return Return.service(project);
}

async function updateProject(id, { name, iconID }) {
    if (!id) return Return.service(null, [{ message: 'Must provide project id.' }]);
    
    const project = await ProjectModel.findOne({ where: { id }});

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);

    const projectWithSameName = await ProjectModel.findOne({ where: { id: { [Op.ne]: id },name }});

    if (projectWithSameName) return Return.service(null, [{ message: 'Project with the same name already exists.' }]);

    await project.update({ name, icon_id: iconID || null });
    
    return Return.service(project);
}

async function deleteProject(id) {
    const project = await ProjectModel.findOne({ where: { id }});

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);
    
    await project.destroy();

    return Return.service(project);
}

async function shareProject(id, userID, readAccess, writeAccess) {
    if (!id || !userID) return Return.service(null, [{ message: 'Must provide projectID and userID.' }]);

    const project = await ProjectModel.findOne({ where: { id } });
    
    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);

    const user = await UserModel.findOne({ where: { id: userID }});

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    await project.addUser(userID, { through: { can_read: readAccess, can_write: writeAccess } });

    return Return.service(project);
}

async function getProjectUsers(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide projectID.' }]);

    const project = await ProjectModel.findOne({ where: { id } });
    
    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);

    const projectUsers = (await project.getUsers()).map(user => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_owner: user.user_project.is_owner,
        can_read: user.user_project.can_read,
        can_write: user.user_project.can_write
    }));

    return Return.service({
        id: project.id, 
        name: project.name,
        users: projectUsers
    });
}

async function revokeProjectUserAccess (id, userID) {
    if (!id || !userID) return Return.service(null, [{ message: 'Must provide project id and user id.' }]);

    const project = await ProjectModel.findOne({ where: { id } });
    
    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);

    const user = await UserModel.findOne({ where: { id: userID }});

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    const projectUser = await project.getUsers({ where: { id: userID }});

    if (!projectUser.length) return Return.service(null, [{ message: 'User does not have access to this project.' }]);

    if (projectUser[0].user_project.is_owner) return Return.service(null, [{ message: 'Access from owners cannot be revoked.' }]);

    await project.removeUser(userID);

    return Return.service(project);
}

async function hasPermission (projectID, userID, objectName, operationName) {
    if (!projectID || !userID || !objectName || !operationName) return Return.service(null, [{ message: 'Must provide valid parameters.' }]);

    const userProject = await UserProjectModel.findOne({ 
        where: { 
            user_id: userID,
            project_id: projectID
        } 
    });
    
    if (!userProject) return Return.service(null, [{ message: 'User does not have access to the project.' }]);

    const evaluateAccess = (userProject, props) => {
        return performLogicalAnd(props.map(prop => userProject[prop]));
    }

    const generateAccessEvaluator = props => () => evaluateAccess(userProject, props);

    const accessEvalutorsByObjectAndOperation = {
        PROJECT: {
            SELECT: generateAccessEvaluator(['can_read']),
            UPDATE: generateAccessEvaluator(['can_write']),
            DELETE: generateAccessEvaluator(['is_owner', 'can_write']),
            SHARE: generateAccessEvaluator(['is_owner'])
        },
        TASK: {
            SELECT: generateAccessEvaluator(['can_read']),
            CREATE: generateAccessEvaluator(['can_write']),
            UPDATE: generateAccessEvaluator(['can_write']),
            DELETE: generateAccessEvaluator(['can_write'])
        },
        ATTACHMENT: {
            UPDATE: generateAccessEvaluator(['can_write']),
            DELETE: generateAccessEvaluator(['can_write'])
        },
        COMMENT: {
            CREATE: generateAccessEvaluator(['can_read']),
            DELETE: generateAccessEvaluator(['can_read'])
        }
    };

    if (!accessEvalutorsByObjectAndOperation[objectName]) return Return.service(null, [{ message: 'Invalid access object name.' }]);

    if (!accessEvalutorsByObjectAndOperation[objectName][operationName]) return Return.service(null, [{ message: 'Invalid operation name or the operation does not exist for the specified object.' }]);

    const accessEvaluator = accessEvalutorsByObjectAndOperation[objectName][operationName];

    return Return.service(accessEvaluator());
}

exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.getProject =  getProject;
exports.shareProject = shareProject;
exports.getProjectUsers = getProjectUsers;
exports.revokeProjectUserAccess = revokeProjectUserAccess;
exports.hasPermission = hasPermission;