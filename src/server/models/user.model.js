const path = require('path');
const bcrypt = require('bcrypt');
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const sequelize = require(path.join(process.cwd(), 'src/server/lib/sequelize'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const { PASSWORD_SALT_ROUNDS, PASSWORD_RESET_TOKEN_SALT_ROUNDS } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));

const User = sequelize.define("user", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4

    },
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
            const saltRounds = PASSWORD_SALT_ROUNDS;
            
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);

            this.setDataValue('password', hash);
        }
    },
    password_reset_token: {
        type: DataTypes.STRING(100),
        set(value)  {
            if (!value) return this.setDataValue('password_reset_token', null);

            const saltRounds = PASSWORD_RESET_TOKEN_SALT_ROUNDS;
            
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);

            this.setDataValue('password_reset_token', hash);
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

User.prototype.isValidPasswordResetToken = function(token) {
    return bcrypt.compareSync(token, this.password_reset_token || '');
}

module.exports = User;
