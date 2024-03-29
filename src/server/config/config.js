const { config } = require('dotenv');

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_STRING: process.env.DATABASE_STRING,
    DATABASE_SCHEMA_NAME: process.env.DATABASE_SCHEMA_NAME,
    AUTHENTICATION_SECRET: process.env.AUTHENTICATION_SECRET,
    PASSWORD_RESET_TOKEN_SECRET: process.env.PASSWORD_RESET_TOKEN_SECRET,
    APPLICATION_EMAIL: process.env.APPLICATION_EMAIL,
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_AUTHENTICATION_KEY: process.env.SMTP_AUTHENTICATION_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    LOGGER_HOST: process.env.LOGGER_HOST,
    LOGGER_PORT: process.env.LOGGER_PORT
}