const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const eventManager = require(path.join(process.cwd(), 'src/server/lib/events'));

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

Task.belongsTo(ProjectModel, { foreignKey: 'project_id', onDelete: 'cascade', onUpdate: 'cascade' });
ProjectModel.hasMany(Task, { foreignKey: 'project_id', onDelete: 'cascade', onUpdate: 'cascade' });
Task.hasMany(Task, { as: 'subtasks', foreignKey: 'parent_task_id' });
Task.belongsTo(Task, { as: 'parentTask', foreignKey: 'parent_task_id' });

Task.beforeUpdate(async (task, options) => {
    const { subscribeToEvent } = options;

    const markChildTasksAsComplete = async () => {
        return await Task.update(
            { is_completed: true }, 
            { 
                where: { 
                    parent_task_id: task.id, 
                    is_completed: false 
                },
                individualHooks: true
            }
        );
    };

    const markParentTasksAsIncomplete = async () => {
        return await Task.update(
            { is_completed: false }, 
            { 
                where: { 
                    id: task.parent_task_id, 
                    is_completed: true 
                },
                individualHooks: true
            }
        );
    };

    if (task.dataValues.is_completed !== task._previousDataValues.is_completed) {
        if (task.is_completed && task.id) {
            if (subscribeToEvent) eventManager.subscribe(subscribeToEvent, markChildTasksAsComplete);
            else await markChildTasksAsComplete();
        } else if (!task.is_completed && task.parent_task_id) {
            if (subscribeToEvent) eventManager.subscribe(subscribeToEvent, markParentTasksAsIncomplete);
            else await markParentTasksAsIncomplete();
        }
    }
});

module.exports = Task;
