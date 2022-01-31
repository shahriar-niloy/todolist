import { Types } from "../constants/notification.constants";

const { TASK_COMPLETED, PROJECT_SHARED } = Types;

const notificationTextGetters = {
    [TASK_COMPLETED]: (notificationEventData) => notificationEventData?.taskName 
        ? `The task '${notificationEventData.taskName}' was recently marked as complete.` 
        : '',
    [PROJECT_SHARED]: (notificationEventData) => notificationEventData?.sharedByUserName
        ? `${notificationEventData?.sharedByUserName} has shared a project with you.`
        : ''
};

export function getNotificationText(type, notificationEventData) {
    if (!type || !notificationTextGetters[type]) return '';
    return notificationTextGetters[type](notificationEventData);
}