const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const TaskModel = require(path.join(process.cwd(), 'src/server/models/task.model'));

const CommentModel = sequelize.define("comment", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    task_id: {
        allowNull: false,
        type: UUID
    },
    user_id: {
        allowNull: false,
        type: UUID
    },
    parent_id: {
        type: UUID
    },
    comment: {
        type: DataTypes.STRING(1000)
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

CommentModel.belongsTo(TaskModel, { as: 'task', foreignKey: 'task_id', onDelete: 'cascade', onUpdate: 'cascade' });
TaskModel.hasMany(CommentModel, { as: 'comments', foreignKey: 'task_id', onDelete: 'cascade', onUpdate: 'cascade' });

CommentModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
UserModel.hasMany(CommentModel, { as: 'comments', foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });

CommentModel.belongsTo(CommentModel, { as: 'parent_comment', foreignKey: 'parent_id', onDelete: 'cascade', onUpdate: 'cascade' });
CommentModel.hasMany(CommentModel, { as: 'replies', foreignKey: 'parent_id', onDelete: 'cascade', onUpdate: 'cascade' });

module.exports = CommentModel;
