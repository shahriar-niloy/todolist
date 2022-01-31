const path = require('path');

const { app, server } = require(path.join(process.cwd(), 'src/server/lib/express'));

require(path.join(process.cwd(), 'src/server/routes'))(app);
require(path.join(process.cwd(), 'src/server/lib/sequelize'));
require(path.join(process.cwd(), 'src/server/app'));
require(path.join(process.cwd(), 'src/server/socket')).init(server);

