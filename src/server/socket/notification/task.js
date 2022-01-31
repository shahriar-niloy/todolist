const path = require('path');

const eventManager = require(path.join(process.cwd(), 'src/server/lib/events'));
const eventConstants = require(path.join(process.cwd(), 'src/server/constants/event.constants'));

async function subscribeToNotification(socket) {
    const subscriptionToken = eventManager.subscribe(eventConstants.ON_NOTIFY, (eventData) => {
        const { recipients, sendToAll, ...data } = eventData;
        const userID = socket.user.id;

        if (!sendToAll && recipients && !recipients.includes(userID)) return;

        socket.emit(eventConstants.ON_NOTIFY, data);
    });

    socket.on('disconnect', () => {
        eventManager.unsubscribe(subscriptionToken);
    });
}

exports.subscribeToNotification = subscribeToNotification;