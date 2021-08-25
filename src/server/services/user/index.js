const path = require('path');
const UserService = require(path.join(process.cwd(), 'src/server/services/user/user.service'));

module.exports = UserService;