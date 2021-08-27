const path = require('path');
const authenticationService = require(path.join(process.cwd(), 'src/server/services/authentication/authentication.service'));

module.exports = authenticationService;