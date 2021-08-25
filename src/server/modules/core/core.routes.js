const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/core/controller'));

module.exports = function(app) {
    app.get('/api/', controller.HelloRoute);
}