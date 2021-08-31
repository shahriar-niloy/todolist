const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/users/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.get('/api/profile', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getProfile));

    app.get('/api/users/:id/projects', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getUserProjects))
        .post('/api/users/:id/projects', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.addProject));
}