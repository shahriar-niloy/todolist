const path = require('path');

const app = require(path.join(process.cwd(), 'src/server/lib/express'));

require(path.join(process.cwd(), 'src/server/routes'))(app);
require(path.join(process.cwd(), 'src/server/lib/sequelize'));

