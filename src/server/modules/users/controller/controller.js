const path = require('path');
const UserService = require(path.join(process.cwd(), 'src/server/services/user'));

function getProfile(req, res) {
    res.send("Profile sent");
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await UserService.login(email, password);

    if (!user) return res.status(401).send('Unauthenticated.');

    res.send(user);
}

exports.getProfile = getProfile;
exports.login = login;