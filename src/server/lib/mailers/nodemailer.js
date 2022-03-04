const path = require('path');
const nodemailer = require('nodemailer');
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const { decrypt } = require(path.join(process.cwd(), 'src/server/utility/encryption'));

const [iv, key] = config.SMTP_ENCRYPTION_KEY.split('-');

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: true,
    auth: {
      user: config.SMTP_USER,
      pass: decrypt(config.SMTP_AUTHENTICATION_KEY, key, iv)
    },
});

async function send(config) {
    try {
        const { to, from, template, subject } = config || {};

        const response = await transporter.sendMail({
            from,
            to: Array.isArray(to) ? to.join(', ') : to,
            subject,
            html: template
        });

        return response;
    }
    catch (err) {
        logger.error(err);
    }
}

module.exports = {
    send
}