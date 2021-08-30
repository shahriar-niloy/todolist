const path = require('path');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const { UserViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));

async function getProfile(req, res) {
    let users = await UserService.getUsers();

    users = users.map(user => UserViewModels.profile(user));

    res.json(users);
}

exports.getProfile = getProfile;