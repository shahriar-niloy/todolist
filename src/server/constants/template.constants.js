const path = require('path');

const WORKING_DIRECTORY = process.cwd(); 
const TEMPLATE_FOLDER_PATH = 'src/server/templates';

exports.TEMPLATE_PREFIX_TOKEN = '[[';
exports.TEMPLATE_SUFFIX_TOKEN = ']]';

exports.TEMPLATE_PATHS = {
    RESET_PASSWORD: path.join(WORKING_DIRECTORY, TEMPLATE_FOLDER_PATH, 'reset-password.html')
}