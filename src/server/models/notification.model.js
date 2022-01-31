const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const UserNotificationModel = require(path.join(process.cwd(), 'src/server/models/user_notification.model'));
const notificationConstants = require(path.join(process.cwd(), 'src/server/constants/notification.constants'));

const notificationTypeEnums = Object.keys(notificationConstants);

const NotificationModel = sequelize.define("notification", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    type: {
        type: DataTypes.ENUM,
        values: notificationTypeEnums,
        allowNull: false
    },
    data: {
        type: DataTypes.JSON
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

NotificationModel.belongsToMany(UserModel, {
    through: UserNotificationModel,
    foreignKey: 'notification_id',
    otherKey: 'user_id'
});

UserModel.belongsToMany(NotificationModel, {
    through: UserNotificationModel,
    foreignKey: 'user_id',
    otherKey: 'notification_id'
});

module.exports = NotificationModel;
