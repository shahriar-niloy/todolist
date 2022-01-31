const path = require('path');
const jwt = require('jsonwebtoken');

const AuthenticationService = require(path.join(process.cwd(), 'src/server/services/authentication'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const { AUTHENTICATION_COOKIE_NAME, AUTHENTICATION_EXPIRY_TIMESTRING } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));
const { UserViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));

async function login(req, res) {
    const { email, password } = req.body;

    const user = await AuthenticationService.login(email, password);

    if (!user) return res.status(401).send('Unauthenticated.');

    res.cookie(AUTHENTICATION_COOKIE_NAME, jwt.sign({ id: user.id }, config.AUTHENTICATION_SECRET, { expiresIn: AUTHENTICATION_EXPIRY_TIMESTRING }));

    res.json(UserViewModels.profile(user));
}

async function logout(req, res) {
    res.clearCookie(AUTHENTICATION_COOKIE_NAME);
    res.send('');
}

exports.login = login;
exports.logout = logout;