const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser')

const config = require(path.join(process.cwd(), 'src/server/config/config'));
require(path.join(process.cwd(), 'src/server/strategies'));
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("dist"));

const server = app.listen(config.PORT, () => {
    logger.info(`Server listening on ${config.PORT}`);
});

module.exports = {
    app,
    server
}; 