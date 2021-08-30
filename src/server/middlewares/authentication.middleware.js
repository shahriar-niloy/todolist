const passport = require("passport");

module.exports = passport.authenticate('user-jwt', { session: false });