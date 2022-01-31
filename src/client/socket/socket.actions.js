import socket from './socket';
import eventConstants from '../constants/socket-event.constants';

export function subscribeToNotification() {
    socket.emit('notification.task.subscribeToNotification');
}

export function addOnNotificationEventHandler(eventHandler) {
    socket.on(eventConstants.ON_NOTIFY, eventHandler);
    return () => socket.off(eventConstants.ON_NOTIFY, eventHandler);
}