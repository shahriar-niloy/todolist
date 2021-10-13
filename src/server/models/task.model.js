const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));

const Task = sequelize.define("task", {
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
    description: {
        type: DataTypes.STRING(200),
    },
    scheduled_at: {
        type: DataTypes.DATE
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM,
        values: ['HIGH','LOW', 'MEDIUM', 'NONE'],
        defaultValue: 'NONE'
    }, 
    project_id: {
        type: UUID,
        allowNull: false
    },
    parent_task_id: {
        type: UUID
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Task.belongsTo(ProjectModel, { foreignKey: 'project_id' });
ProjectModel.hasMany(Task, { foreignKey: 'project_id' });
Task.hasMany(Task, { as: 'subtasks', foreignKey: 'parent_task_id' });
Task.belongsTo(Task, { as: 'parentTask', foreignKey: 'parent_task_id' });

Task.beforeUpdate(async task => {
    if (task.is_completed && (task.dataValues.is_completed !== task._previousDataValues.is_completed)) {
        await Task.update(
            { is_completed: true }, 
            { 
                where: { 
                    parent_task_id: task.id, 
                    is_completed: false 
                },
                individualHooks: true
            }
        );
    }
});

module.exports = Task;
