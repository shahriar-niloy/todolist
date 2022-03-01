const path = require("path");
const config = require(path.join(process.cwd() ,'src/server/config/config'));
module.exports = require(path.join(process.cwd() ,`src/client/config/webpack/webpack.${config.NODE_ENV}`));