const path = require('path');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const { UserViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));

async function getProfile(req, res) {
    let users = await UserService.getUsers();

    users = users.map(user => UserViewModels.profile(user));

    res.json(users);
}

async function addProject(req, res) {
    const user_id = req.params.id;
    const { project_id, is_owner } = req.body;

    if (!user_id || !project_id) return res.status(404).send("Invalid parameters");

    const user = await UserService.getUser(user_id);

    if (!user) return res.status(404).send("Invalid parameters");
    
    await user.addProject(project_id, { through: { is_owner: is_owner || false } });

    res.json(UserViewModels.profile(user));
}

exports.getProfile = getProfile;
exports.addProject = addProject;