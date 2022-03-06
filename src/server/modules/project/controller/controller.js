const path = require('path');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const ProjectService = require(path.join(process.cwd(), 'src/server/services/project'));
const NotificationService = require(path.join(process.cwd(), 'src/server/services/notification'));
const { ProjectViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getProject(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const id = req.params.id;

    if (!id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const [project, err] = await ProjectService.getProject(id);

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

async function createProject(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { name, user_id, icon_id } = req.body;

    if (!name || !user_id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const [user] = await UserService.getUser(user_id);

    if (!user) {
        errorResponse.addError('User does not exist.', '');
        return res.status(400).json(errorResponse);
    }
    
    const [project, err] = await ProjectService.createProject({ name, user_id, iconID: icon_id });

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

async function updateProject(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const id = req.params.id;
    const { name, icon_id } = req.body;

    if (!name || !id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const [hasPermissionToUpdate, permissionErr] = await ProjectService.hasPermission(id, req.user.id, 'PROJECT', 'UPDATE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToUpdate) {
        errorResponse.addError('Forbidden.', '');
        return res.status(403).send(errorResponse);
    }

    const [project, err] = await ProjectService.updateProject(id, { name, iconID: icon_id });

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

async function deleteProject(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const id = req.params.id;

    const [hasPermissionToDelete, err] = await ProjectService.hasPermission(id, req.user.id, 'PROJECT', 'DELETE');

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToDelete) {
        errorResponse.addError('Forbidden.', '');
        return res.status(403).send(errorResponse);
    }

    const project = await ProjectService.deleteProject(id);

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

async function shareProject(req, res) {
    const errorResponse = new Response.error();

    const requestingUserID = req.user.id;
    const id = req.params.id;
    const { 
        user_id: userID, 
        can_read: hasReadAccess, 
        can_write: hasWriteAccess
    } = req.body;

    if (requestingUserID === userID) {
        errorResponse.addError('User cannot modify its own access to a project.', '');
        return res.status(403).json(errorResponse);
    }

    const [hasPermissionToShare, err] = await ProjectService.hasPermission(id, requestingUserID, 'PROJECT', 'SHARE');

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToShare) {
        errorResponse.addError('The user does not have the permission to share the project.', '');
        return res.status(403).json(errorResponse);
    }

    await ProjectService.shareProject(id, userID, hasReadAccess, hasWriteAccess);
    await NotificationService.createProjectSharedNotification(id, userID, requestingUserID);

    res.sendStatus(200);
}

async function getProjectUsers(req, res) {
    const successResponse = new Response.success();

    const id = req.params.id;

    const [project] = await ProjectService.getProjectUsers(id);

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

async function revokeProjectUserAccess(req, res) {
    const errorResponse = new Response.error();
    const { id: projectID, userID } = req.params;
    const requestingUserID = req.user.id;
    
    if (requestingUserID === userID) {
        errorResponse.addError('User cannot modify its own access to a project.', '');
        return res.status(403).json(errorResponse);
    }

    const [hasPermissionToShare, permissionErr] = await ProjectService.hasPermission(projectID, requestingUserID, 'PROJECT', 'SHARE');

    if (permissionErr) {
        permissionErr.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    if (!hasPermissionToShare) {
        errorResponse.addError('The user does not have the permission to revoke access of a user.', '');
        return res.status(403).json(errorResponse);
    }

    const [, err] = await ProjectService.revokeProjectUserAccess(projectID, userID);

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    res.sendStatus(200);
}

exports.getProject = getProject;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.shareProject = shareProject;
exports.getProjectUsers = getProjectUsers;
exports.revokeProjectUserAccess = revokeProjectUserAccess;