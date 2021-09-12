const path = require('path');
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));

async function createProject({ name, user_id }) {
    const projectWithSameName = await ProjectModel.findOne({ where: { name }});

    if (projectWithSameName) return Return.service(null, [{ message: 'Project with the same name already exists.' }]);

    const project = await ProjectModel.create({ name });
    
    await project.addUser(user_id, { through: { is_owner: true } });

    project.users = await project.getUsers();
    
    return Return.service(project);
}

async function deleteProject(id) {
    const project = await ProjectModel.findOne({ where: { id }});

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);
    
    await project.destroy();

    return Return.service(project);
}

exports.createProject = createProject;
exports.deleteProject = deleteProject;