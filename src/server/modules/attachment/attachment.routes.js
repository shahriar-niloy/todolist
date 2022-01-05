const path = require('path');

const controller = require(path.join(process.cwd(), 'src/server/modules/attachment/attachment.controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.delete('/api/attachment/:id', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.deleteAttachment));
}