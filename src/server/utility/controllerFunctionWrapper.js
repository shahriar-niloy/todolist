const path = require('path');
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));

module.exports = function (func) {
    return function(req, res) {
        try {
            func(req, res);
        } catch(err) {
            logger.error(err);
            res.status(500).send('Internal server error.');
        }
    }
}