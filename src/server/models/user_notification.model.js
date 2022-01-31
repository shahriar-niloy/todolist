const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const User_Notification = sequelize.define('user_notification', 
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: UUID,
            defaultValue: UUIDV4
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, 
    { 
        timestamps: true,
        schema: config.DATABASE_SCHEMA_NAME,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = User_Notification;