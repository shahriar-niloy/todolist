const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/icon/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.get('/api/icons', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getIcons));
}