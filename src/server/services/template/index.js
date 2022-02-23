const fs = require('fs');
const path = require('path');
const { TEMPLATE_PREFIX_TOKEN, TEMPLATE_SUFFIX_TOKEN } = require(path.join(process.cwd(), 'src/server/constants/template.constants'));

function TemplateService(path, data={}) {
    this.path = path; 
    this.data = data;
    this.prefixToken = TEMPLATE_PREFIX_TOKEN;
    this.suffixToken = TEMPLATE_SUFFIX_TOKEN;
    this.templateString = null;

    this.readFromDisk = () => {
        return fs.readFileSync(this.path);
    };

    this.toString = (buffer) => {
        return buffer.toString();
    };

    this.replaceTags = (templateString) => {
        let processedTemplate = templateString;

        for (const key in this.data) {
            const value = this.data[key];
            const textToReplace = `${this.prefixToken}${key}${this.suffixToken}`;
            processedTemplate = processedTemplate.replaceAll(textToReplace, value);
        }

        return processedTemplate;
    };

    this.getTemplate = () => {
        if (this.templateString !== null) return this.templateString;

        const buffer = this.readFromDisk();
        const templateString = this.toString(buffer);
        this.templateString = this.replaceTags(templateString);
        
        return this.templateString;
    };
}

module.exports = TemplateService;