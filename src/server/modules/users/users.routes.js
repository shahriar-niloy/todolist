const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/users/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));
const AUTHENTICATION_MIDDLEWARE = require(path.join(process.cwd(), 'src/server/middlewares/authentication.middleware'));

module.exports = function(app) {
    app.get('/api/me/notifications', AUTHENTICATION_MIDDLEWARE, controller.getMyNotifications);

    app.put('/api/me/notifications/mark-as-read', AUTHENTICATION_MIDDLEWARE, controller.markMyNotificationsAsRead);

    app.get('/api/me', AUTHENTICATION_MIDDLEWARE, controller.getMyProfile);

    app.get('/api/users/search', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.searchUsers));

    app.get('/api/users/:id/projects', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.getUserProjects))
        .post('/api/users/:id/projects', AUTHENTICATION_MIDDLEWARE, controllerFunctionWrapper(controller.addProject));
}