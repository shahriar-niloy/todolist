const path = require('path');
const responseSchema = require(path.join(process.cwd(), 'src/server/schemas/response.schema'));
const returnSchema = require(path.join(process.cwd(), 'src/server/schemas/return.schema'));

exports.Response = responseSchema;
exports.Return = returnSchema;