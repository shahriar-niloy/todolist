const path = require('path');
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const iconTypes = require(path.join(process.cwd(), 'src/server/constants/icon-types.constant'));

async function seedDatabase() {
    try {
        await sequelize.query(`DROP SCHEMA IF EXISTS ${config.DATABASE_SCHEMA_NAME} CASCADE`);
        await sequelize.query(`CREATE SCHEMA ${config.DATABASE_SCHEMA_NAME};`);
        
        // Model Initialization
        const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
        require(path.join(process.cwd(), 'src/server/models/project.model'));
        require(path.join(process.cwd(), 'src/server/models/task.model'));
        require(path.join(process.cwd(), 'src/server/models/attachment.model'));
        require(path.join(process.cwd(), 'src/server/models/notification.model'));
        require(path.join(process.cwd(), 'src/server/models/comment.model'));
        const Icon = require(path.join(process.cwd(), 'src/server/models/icon.model'));

        await sequelize.sync();

        await UserModel.create({
            first_name: 'System',
            last_name: 'Admin',
            email: 'shahriar_niloy@outlook.com',
            password: 'admin123'
        });

        await Icon.bulkCreate([
            {
                name: 'desktop',
                class: 'far fa-desktop-alt',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'lightbulb',
                class: 'far fa-lightbulb',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'chart',
                class: 'far fa-chart-bar',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'coins',
                class: 'far fa-coins',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'plane',
                class: 'far fa-plane-departure',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'shopping',
                class: 'far fa-shopping-bag',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'envelope',
                class: 'far fa-envelope',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'cake',
                class: 'far fa-birthday-cake',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'burger',
                class: 'far fa-cheeseburger',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'tasks',
                class: 'far fa-tasks',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'presentation',
                class: 'fas fa-presentation',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'film',
                class: 'fas fa-film',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'book',
                class: 'far fa-books',
                type: iconTypes.STYLESHEET
            },
            {
                name: 'bug',
                class: 'far fa-bug',
                type: iconTypes.STYLESHEET
            }
        ]);

        console.info('Seeding finished.');
    } catch(err) {
        console.error(err);
    }
}

seedDatabase();