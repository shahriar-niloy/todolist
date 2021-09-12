const path = require('path');
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getProject(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide project id.' }]);
    
    const project = await ProjectModel.findOne({ where: { id }});

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);
    
    return Return.service(project);
}

async function createProject({ name, user_id }) {
    const projectWithSameName = await ProjectModel.findOne({ where: { name }});

    if (projectWithSameName) return Return.service(null, [{ message: 'Project with the same name already exists.' }]);

    const project = await ProjectModel.create({ name });
    
    await project.addUser(user_id, { through: { is_owner: true } });

    project.users = await project.getUsers();
    
    return Return.service(project);
}

async function updateProject(id, { name }) {
    if (!id) return Return.service(null, [{ message: 'Must provide project id.' }]);
    
    const project = await ProjectModel.findOne({ where: { id }});

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);

    const projectWithSameName = await ProjectModel.findOne({ where: { name }});

    if (projectWithSameName) return Return.service(null, [{ message: 'Project with the same name already exists.' }]);

    await project.update({ name });
    
    return Return.service(project);
}

async function deleteProject(id) {
    const project = await ProjectModel.findOne({ where: { id }});

    if (!project) return Return.service(null, [{ message: 'Project does not exist.' }]);
    
    await project.destroy();

    return Return.service(project);
}

exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.getProject =  getProject;