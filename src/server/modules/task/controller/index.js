const path = require("path");
const controller = require(path.join(process.cwd(), 'src/server/modules/task/controller/controller'));

module.exports = { ...controller };