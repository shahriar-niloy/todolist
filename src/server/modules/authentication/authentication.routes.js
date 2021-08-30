const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/authentication/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));

module.exports = function(app) {
    app.post('/api/login', controllerFunctionWrapper(controller.login));

    app.get('/api/logout', controllerFunctionWrapper(controller.logout));
}