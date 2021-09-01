const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/task/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.post('/api/tasks', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.createTask));
    
    app.put('/api/tasks/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.updateTask))
        .delete('/api/tasks/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.deleteTask));
}