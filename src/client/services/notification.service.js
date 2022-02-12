import { Types } from "../constants/notification.constants";

const { TASK_COMPLETED, PROJECT_SHARED, COMMENT_MENTION } = Types;

const notificationTextGetters = {
    [TASK_COMPLETED]: (notificationEventData) => notificationEventData?.taskName 
        ? `The task '${notificationEventData.taskName}' was recently marked as complete.` 
        : '',
    [PROJECT_SHARED]: (notificationEventData) => notificationEventData?.sharedByUserName
        ? `${notificationEventData?.sharedByUserName} has shared a project with you.`
        : '',
    [COMMENT_MENTION]: (notificationEventData) => notificationEventData?.mentioningUserName
        ? `${notificationEventData?.mentioningUserName} has mentioned you in a comment.`
        : ''
};

export function getNotificationText(type, notificationEventData) {
    if (!type || !notificationTextGetters[type]) return '';
    return notificationTextGetters[type](notificationEventData);
}