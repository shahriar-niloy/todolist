const path = require('path');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const User_Project = sequelize.define('user_project', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: UUID,
            defaultValue: UUIDV4
        },
        is_owner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            set (value) {
                if (value) {
                    this.setDataValue('can_read', true);
                    this.setDataValue('can_write', true);
                }
                this.setDataValue('is_owner', value);
            }
        },
        can_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        can_write: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, 
    { 
        timestamps: true,
        schema: config.DATABASE_SCHEMA_NAME,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = User_Project;