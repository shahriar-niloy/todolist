const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/users/controller'));
const controllerFunctionWrapper = require(path.join(process.cwd(), 'src/server/utility/controllerFunctionWrapper'));

module.exports = function(app) {
    app.get('/api/profile', controllerFunctionWrapper(controller.getProfile));
    
    app.post('/api/login', controllerFunctionWrapper(controller.login));
}