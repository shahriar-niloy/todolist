const path = require('path');
const routePaths = require(path.join(process.cwd(), 'src/server/config/route.paths'));

module.exports = function (app) {
    routePaths.forEach(routePath => require(path.join(process.cwd(), routePath))(app));
}
