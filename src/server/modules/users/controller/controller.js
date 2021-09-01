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

async function addProject(req, res) {
    const user_id = req.params.id;
    const { project_id, is_owner } = req.body;

    if (!user_id || !project_id) return res.status(404).send("Invalid parameters");

    const user = await UserService.getUser(user_id);

    if (!user) return res.status(400).send("Invalid parameters.");
    
    await user.addProject(project_id, { through: { is_owner: is_owner || false } });

    res.json(UserViewModels.profile(user));
}

async function getUserProjects(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).send('Invalid parameters.');

    const user = await UserService.getUser(id);

    if (!user) return res.status(400).send('User not found.');

    res.json(UserViewModels.projects(user));
}

exports.getProfile = getProfile;
exports.addProject = addProject;
exports.getUserProjects = getUserProjects;