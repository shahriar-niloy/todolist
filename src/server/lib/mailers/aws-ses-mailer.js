const path = require('path');
const { sesClient, SendEmailCommand } = require(path.join(process.cwd(), 'src/server/lib/aws-ses'));
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));

async function send(config) {
    try {
        const { to, from, template, subject } = config || {};

        const sesParams = {
            Destination: {
                ToAddresses: Array.isArray(to) ? to : [to]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: template,
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject
                }
            },
            Source: from
        };

        const data = await sesClient.send(new SendEmailCommand(sesParams));

        return data;
    }
    catch (err) {
        logger.error(err);
    }
}

module.exports = {
    send
}