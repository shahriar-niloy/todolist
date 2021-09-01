const path = require('path');
const TaskService = require(path.join(process.cwd(), 'src/server/services/task/task.service'));

module.exports = TaskService;