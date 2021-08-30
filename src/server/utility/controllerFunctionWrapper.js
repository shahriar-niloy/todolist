const path = require('path');
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));

module.exports = function (func) {
    return async function(req, res) {
        try {
            await Promise.resolve(func(req, res));
        } catch(err) {
            logger.error(err);
            res.status(500).send('Internal server error.');
        }
    }
}