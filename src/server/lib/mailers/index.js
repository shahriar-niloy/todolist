const path = require('path');
const AwsSesMailer = require(path.join(process.cwd(), 'src/server/lib/mailers/aws-ses-mailer'));

exports.AwsSesMailer = AwsSesMailer;