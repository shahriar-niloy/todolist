const path = require('path');
const jwt = require('jsonwebtoken');

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const AuthenticationService = require(path.join(process.cwd(), 'src/server/services/authentication'));
const { UserViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const { AUTHENTICATION_COOKIE_NAME, AUTHENTICATION_EXPIRY_TIMESTRING } = require(path.join(process.cwd(), 'src/server/config/app.constants'));

async function getProfile(req, res) {
    let users = await UserService.getUsers();

    users = users.map(user => UserViewModels.profile(user));

    res.json(users);
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await AuthenticationService.login(email, password);

    if (!user) return res.status(401).send('Unauthenticated.');

    res.cookie(AUTHENTICATION_COOKIE_NAME, jwt.sign({ id: user.id }, config.AUTHENTICATION_SECRET, { expiresIn: AUTHENTICATION_EXPIRY_TIMESTRING }));

    res.json(UserViewModels.profile(user));
}

exports.getProfile = getProfile;
exports.login = login;