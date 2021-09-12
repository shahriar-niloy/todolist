const path = require('path');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const ProjectService = require(path.join(process.cwd(), 'src/server/services/project'));
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

    const { name, user_id } = req.body;

    if (!name || !user_id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const user = await UserService.getUser(user_id);

    if (!user) {
        errorResponse.addError('User does not exist.', '');
        return res.status(400).json(errorResponse);
    }
    
    const [project, err] = await ProjectService.createProject({ name, user_id });

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
    const { name } = req.body;

    if (!name || !id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const [project, err] = await ProjectService.updateProject(id, { name });

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

async function deleteProject(req, res) {
    const successResponse = new Response.success();

    const id = req.params.id;

    const project = await ProjectService.deleteProject(id);

    successResponse.data = ProjectViewModels.project(project);

    res.json(successResponse);
}

exports.getProject = getProject;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;