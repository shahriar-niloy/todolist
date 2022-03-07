const path = require('path');
const winston = require('winston');
const { PapertrailTransport } = require('winston-papertrail-transport');
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const { combine, timestamp, prettyPrint, errors } = winston.format;

const papertrailTransport = new PapertrailTransport({
    host: config.LOGGER_HOST,
    port: config.LOGGER_PORT
});

const transports = [new winston.transports.Console()];

if (config.NODE_ENV === 'production') {
    transports.push(papertrailTransport);
}

const logger = winston.createLogger({
    format: combine(
        errors({ stack: true }),
        timestamp(),
        prettyPrint()
    ),
    transports
});

module.exports = logger;