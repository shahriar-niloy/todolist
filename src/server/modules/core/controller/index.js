const path = require('path');
const controller = require(path.join(process.cwd(), 'src/server/modules/core/controller/controller'));

module.exports = { ...controller };