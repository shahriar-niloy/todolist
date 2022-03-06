const path = require('path');
const IconService = require(path.join(process.cwd(), 'src/server/services/icon'));
const { ProjectViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getIcons(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const [icons, err] = await IconService.getIcons();

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = icons;

    res.json(successResponse);
}

exports.getIcons = getIcons;