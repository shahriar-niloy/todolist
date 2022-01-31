const path = require('path');

const eventManager = require(path.join(process.cwd(), 'src/server/lib/events'));
const eventConstants = require(path.join(process.cwd(), 'src/server/constants/event.constants'));

function configureEvents() {
    eventManager.addEvent(eventConstants.ON_NOTIFY);
}

configureEvents();

