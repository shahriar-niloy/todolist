const path = require('path');
const express = require("express");

const config = require(path.join(process.cwd(), 'src/server/config/config'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.PORT, () => {
  console.info(`Server listening on ${config.PORT}`);
});

module.exports = app; 