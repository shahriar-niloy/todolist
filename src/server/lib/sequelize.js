const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const sequelize = new Sequelize(config.DATABASE_STRING, { 
    logging: false,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;