const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const iconTypes = require(path.join(process.cwd(), 'src/server/constants/icon-types.constant'));

const IconModel = sequelize.define("icon", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: Object.values(iconTypes)
    },
    class: {
        type: DataTypes.STRING
    },
    src: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

ProjectModel.belongsTo(IconModel, { foreignKey: 'icon_id' });

module.exports = IconModel;
