const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser')

const config = require(path.join(process.cwd(), 'src/server/config/config'));
require(path.join(process.cwd(), 'src/server/strategies'));

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.sendFile(HTML_FILE, function(err){
       if(err){
          res.status(500).send(err);
       }
    });
});

app.listen(config.PORT, () => {
  console.info(`Server listening on ${config.PORT}`);
});

module.exports = app; 