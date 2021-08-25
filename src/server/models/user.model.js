const path = require('path');
const bcrypt = require('bcrypt');
const { DataTypes } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const User = sequelize.define("user", {
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING(100),
        set(value)  {
            const saltRounds = 10;
            
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);

            this.setDataValue('password', hash);
        }
    }
}, {
    timestamps: true,
    schema: config.DATABASE_SCHEMA_NAME,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = User;
