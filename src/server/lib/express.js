const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser')

const config = require(path.join(process.cwd(), 'src/server/config/config'));
require(path.join(process.cwd(), 'src/server/strategies'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(config.PORT, () => {
  console.info(`Server listening on ${config.PORT}`);
});

module.exports = app; 