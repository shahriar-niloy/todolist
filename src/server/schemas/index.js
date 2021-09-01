const path = require('path');
const responseSchema = require(path.join(process.cwd(), 'src/server/schemas/response.schema'));

exports.Response = responseSchema;