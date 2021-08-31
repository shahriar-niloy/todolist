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
        defaultValue: false
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    project_id: {
        type: UUID
    }    
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Task.belongsTo(ProjectModel, { foreignKey: 'project_id' });

module.exports = Task;
