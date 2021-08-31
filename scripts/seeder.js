const path = require('path');
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));

async function seedDatabase() {
    try {
        await sequelize.query(`DROP SCHEMA IF EXISTS ${config.DATABASE_SCHEMA_NAME} CASCADE`);
        await sequelize.query(`CREATE SCHEMA ${config.DATABASE_SCHEMA_NAME};`);
        
        // Model Initialization
        const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
        require(path.join(process.cwd(), 'src/server/models/project.model'));
        require(path.join(process.cwd(), 'src/server/models/task.model'));

        await sequelize.sync();

        await UserModel.create({
            first_name: 'System',
            last_name: 'Admin',
            email: 'shahriar_niloy@outlook.com',
            password: 'admin123'
        });

        console.info('Seeding finished.');
    } catch(err) {
        console.error(err);
    }
}

seedDatabase();