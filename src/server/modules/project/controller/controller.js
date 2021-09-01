const path = require('path');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const ProjectService = require(path.join(process.cwd(), 'src/server/services/project'));
const { ProjectViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

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

exports.createProject = createProject;