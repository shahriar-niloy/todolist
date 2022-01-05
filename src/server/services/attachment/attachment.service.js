const path = require('path');
const AttachmentModel = require(path.join(process.cwd(), 'src/server/models/attachment.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));

async function deleteTaskAttachment(attachmentID) {
    if (!attachmentID) return Return.service(null, [{ message: 'Must provide required paramters.' }]);

    const attachment = await AttachmentModel.findOne({ where: { id: attachmentID } });

    if (!attachment) return Return.service(null, [{ message: 'Invalid attachment id.' }]);    

    await attachment.destroy();

    return Return.service(attachment);
}

exports.deleteTaskAttachment = deleteTaskAttachment;