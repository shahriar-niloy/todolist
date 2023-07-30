const path = require('path');
const axios = require('axios');

const eventManager = require(path.join(process.cwd(), 'src/server/lib/events'));
const eventConstants = require(path.join(process.cwd(), 'src/server/constants/event.constants'));

function configureEvents() {
    eventManager.addEvent(eventConstants.ON_NOTIFY);
}

configureEvents();

(function() {
    if (!process.env.HEALTH_CHECK_URL) return;

    setInterval(
        async function() {
            try {
                const { data } = await axios.get(process.env.HEALTH_CHECK_URL);
                console.log(data);
            } catch(err) {
                console.error(err);
            }
        },
        10 * 60 * 1000
    );
})();

