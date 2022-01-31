const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')();

const config = require(path.join(process.cwd(), 'src/server/config/config'));
const { AUTHENTICATION_COOKIE_NAME } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));
const UserService = require(path.join(process.cwd(), 'src/server/services/user/user.service'));

function parseSocketCookieMiddleware (socket, next) {
    cookieParser(socket.request, {}, err => { 
        if (!err) socket.cookies = socket.request.cookies;
        next(err);
    });
}

async function authenticateSocket(socket, next) {
    const authToken = socket.cookies[AUTHENTICATION_COOKIE_NAME];

    jwt.verify(authToken, config.AUTHENTICATION_SECRET, function (err, payload)  {
        if (err) return next(err);
        
        UserService.getUser(payload.id)
            .then(([user]) => {
                socket.user = user;
                next();
            })
            .catch(err => next(err));
    });
}

exports.parseSocketCookieMiddleware = parseSocketCookieMiddleware;
exports.authenticateSocket = authenticateSocket;