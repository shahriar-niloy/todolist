const path = require('path');
const { Op } = require('sequelize');
const IconModel = require(path.join(process.cwd(), 'src/server/models/icon.model'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getIcons() {
    const icons = await IconModel.findAll();
    return Return.service(icons);
}

async function getIcon({ name, id }) {
    if (!name && !id) return Return.service(null, [{ message: 'Must provide at least one argument.' }]);
    
    const where = {};
    
    if (id) where.id = id;
    if (name) where.name = { [Op.iLike]: name };

    const icon = await IconModel.findOne({ where });

    return Return.service(icon);
}

exports.getIcon = getIcon;
exports.getIcons = getIcons;