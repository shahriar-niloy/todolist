const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));

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
    user_id: {
        type: DataTypes.UUID
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Project.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' });

module.exports = Project;
