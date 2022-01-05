const path = require('path');
const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const { AttachmentViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function deleteAttachment (req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    const attachmentID = req.params.id;

    const [attachment, errors] = await TaskService.deleteTaskAttachment(attachmentID);

    if (errors) {
        errors.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = AttachmentViewModels.attachment(attachment);

    res.json(successResponse);
}

exports.deleteAttachment = deleteAttachment;