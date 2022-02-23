const path = require('path');
const  { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const config = require(path.join(process.cwd(), 'src/server/config/config'));

const sesClient = new SESClient({ region: config.AWS_REGION });

module.exports = {
    sesClient,
    SendEmailCommand
};