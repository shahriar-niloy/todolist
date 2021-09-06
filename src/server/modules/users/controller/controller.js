const path = require('path');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const { UserViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getProfile(req, res) {
    const successResponse = new Response.success();

    let users = await UserService.getUsers();

    users = users.map(user => UserViewModels.profile(user));

    successResponse.data = users;

    res.json(successResponse);
}

async function getMyProfile(req, res) {
    try {
        const successResponse = new Response.success();

        successResponse.data = UserViewModels.profile(req.user);

        res.json(successResponse);
    } catch(err) {
        console.error(err);
    }
}

async function addProject(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const user_id = req.params.id;
    const { project_id, is_owner } = req.body;

    if (!user_id || !project_id) {
        errorResponse.addError('Invalid parameters', '');
        return res.status(400).json(errorResponse);
    }

    const user = await UserService.getUser(user_id);

    if (!user) {
        errorResponse.addError('User not found.', '');
        return res.status(400).json(errorResponse);
    }
    
    await user.addProject(project_id, { through: { is_owner: is_owner || false } });

    successResponse.data = UserViewModels.profile(user);

    res.json(successResponse);
}

async function getUserProjects(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    if (!id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const user = await UserService.getUser(id);

    if (!user) {
        errorResponse.addError('User not found.', '');
        return res.status(400).json(errorResponse);
    }

    successResponse.data = UserViewModels.projects(user);

    res.json(successResponse);
}

exports.getProfile = getProfile;
exports.addProject = addProject;
exports.getUserProjects = getUserProjects;
exports.getMyProfile = getMyProfile;