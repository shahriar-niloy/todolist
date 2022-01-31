const path = require('path');
const passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy;

const config = require(path.join(process.cwd(), 'src/server/config/config'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const { AUTHENTICATION_COOKIE_NAME } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));

var opts = {};

const cookieExtractor = function(req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies[AUTHENTICATION_COOKIE_NAME];
    }

    return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.AUTHENTICATION_SECRET;

passport.use('user-jwt', new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await UserModel.findOne({ where: { id: jwt_payload.id } })
        if (user) done(null, user); 
        else done(null, false);
    } catch(err) {
        console.error(err);
        done(err, false);
    }
}));