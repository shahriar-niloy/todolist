const path = require("path");
const controller = require(path.join(process.cwd(), 'src/server/modules/project/controller/controller'));

module.exports = { ...controller };