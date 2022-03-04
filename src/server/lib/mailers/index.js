const path = require('path');
const NodeMailer = require(path.join(process.cwd(), 'src/server/lib/mailers/nodemailer'));

exports.NodeMailer = NodeMailer;