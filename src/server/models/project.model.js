const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const UserProjectModel = require(path.join(process.cwd(), 'src/server/models/user_project.model'));

const Project = sequelize.define("project", {
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
    icon_id: {
        type: UUID
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Project.belongsToMany(UserModel, {
    through: UserProjectModel,
    foreignKey: 'project_id',
    otherKey: 'user_id'
});

UserModel.belongsToMany(Project, {
    through: UserProjectModel,
    foreignKey: 'user_id',
    otherKey: 'project_id'
});

module.exports = Project;
