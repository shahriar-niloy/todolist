const path = require('path');
const CONSOLE_COLORS = require(path.join(process.cwd(), 'src/server/constants/console-color.constants'));

function error (err) {
    console.error(err);
}

function info (err) {
    console.info(err);
}

function log (err) {
    console.log(err);
}

function warn (err) {
    console.warn(`${CONSOLE_COLORS.BACKGROUND.YELLOW}${CONSOLE_COLORS.FOREGROUND.BLACK}%s${CONSOLE_COLORS.RESET}`, err);
}

module.exports = {
    error,
    info,
    log,
    warn
}