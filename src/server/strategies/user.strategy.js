const path = require('path');
const passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy;

const config = require(path.join(process.cwd(), 'src/server/config/config'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));

var opts = {};

const cookieExtractor = function(req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }

    return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.AUTHENTICATION_SECRET;

passport.use('user-jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    done(null, {});
    UserModel.findOne({id: jwt_payload.id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));