const path = require('path');
const routePaths = require(path.join(process.cwd(), 'src/server/config/route.paths'));

const DIST_DIR = path.join(process.cwd(), "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

module.exports = function (app) {
    routePaths.forEach(routePath => require(path.join(process.cwd(), routePath))(app));

    app.get("*", (req, res) => {
        res.sendFile(HTML_FILE, function(err){
           if(err) res.status(500).send(err);
        });
    });
}
