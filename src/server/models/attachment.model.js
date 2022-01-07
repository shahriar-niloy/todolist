const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const TaskModel = require(path.join(process.cwd(), 'src/server/models/task.model'));
const { ENUM_ATTACHMENT_TYPES } = require(path.join(process.cwd(), 'src/server/modules/attachment/attachment.constants'));

const AttachmentModel = sequelize.define("attachment", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    file_size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(ENUM_ATTACHMENT_TYPES),
        allowNull: false
    },
    mimetype: {
        type: DataTypes.STRING(100)
    },
    task_id: {
        type: UUID,
        allowNull: false
    },
    data: {
        allowNull: false,
        type: DataTypes.BLOB
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

AttachmentModel.belongsTo(TaskModel, { foreignKey: 'task_id', onDelete: 'cascade', onUpdate: 'cascade' });
TaskModel.hasMany(AttachmentModel, { foreignKey: 'task_id', onDelete: 'cascade', onUpdate: 'cascade' });

module.exports = AttachmentModel;
