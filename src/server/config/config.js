require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_STRING: process.env.DATABASE_STRING,
    DATABASE_SCHEMA_NAME: process.env.DATABASE_SCHEMA_NAME,
    AUTHENTICATION_SECRET: process.env.AUTHENTICATION_SECRET,
    PASSWORD_RESET_TOKEN_SECRET: process.env.PASSWORD_RESET_TOKEN_SECRET
}