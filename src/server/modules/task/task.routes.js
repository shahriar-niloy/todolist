const path = require('path');
const multer  = require('multer');

const controller = require(path.join(process.cwd(), 'src/server/modules/task/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

const processMultipartForm = multer();

module.exports = function(app) {
    app.get('/api/tasks', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getTasks))
        .post('/api/tasks', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.createTask))
        .put('/api/tasks', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.bulkUpdateTasks));
    
    app.get('/api/tasks/:id/subtasks', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getAllSubtasks));

    app.get('/api/tasks/:id/attachments', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getTaskAttachments))
        .post('/api/tasks/:id/attachments', AUTHENTICATION_MIDDLEWARE, processMultipartForm.single('data'), controllerFunctionWrapper(controller.createTaskAttachment));

    app.get('/api/tasks/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getTask))
        .put('/api/tasks/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.updateTask))
        .delete('/api/tasks/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.deleteTask));
}