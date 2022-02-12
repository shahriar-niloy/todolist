const path = require('path');

const controller = require(path.join(process.cwd(), 'src/server/modules/comment/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.post('/api/comment', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.createComment));

    app.delete('/api/comment/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.deleteComment));
}