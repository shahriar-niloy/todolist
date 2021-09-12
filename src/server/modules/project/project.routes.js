const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/project/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.post('/api/projects', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.createProject));
    
    app.get('/api/projects/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getProject))
        .put('/api/projects/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.updateProject))
        .delete('/api/projects/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.deleteProject));
}