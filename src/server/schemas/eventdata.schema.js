const path = require('path');
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));

function notification(id, type, createdAt, data={}, recipients=[]) {
    if (!id) logger.warn('Missing the argument id.');
    if (!type) logger.warn('Missing the argument type.');
    if (!createdAt) logger.warn('Missing the argument createdAt.');

    return {
        id,
        type,
        createdAt,
        recipients,
        sendToAll: !recipients.length,
        data
    }
}

exports.notification = notification;