const path = require('path');
const { NodeMailer: Mailer } = require(path.join(process.cwd(), 'src/server/lib/mailers'));
const TemplateService = require(path.join(process.cwd(), 'src/server/services/template'));

function EmailService(to, from, subject, templatePath, data) {
    this.to = Array.isArray(to) ? to : [to];
    this.from = from;
    this.templatePath = templatePath;
    this.data = data;
    this.subject = subject;

    this.send = async () => {
        if (!this.to) throw new Error('Must provide the receiver email addresses');
        if (!this.templatePath) throw new Error('Must provide the template path');

        const emailTemplate = new TemplateService(this.templatePath, this.data);

        await Mailer.send({
            to: this.to,
            from: this.from,
            template: emailTemplate.getTemplate(),
            subject: this.subject
        });
    }; 
}

module.exports = EmailService;