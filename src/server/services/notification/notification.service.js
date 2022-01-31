const path = require('path');
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const NotificationModel = require(path.join(process.cwd(), 'src/server/models/notification.model'));
const TaskService = require(path.join(process.cwd(), 'src/server/services/task'));
const ProjectService = require(path.join(process.cwd(), 'src/server/services/project'));
const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));
const notificationConstants = require(path.join(process.cwd(), 'src/server/constants/notification.constants'));
const eventDataSchema = require(path.join(process.cwd(), 'src/server/schemas/eventdata.schema'));

const eventManager = require(path.join(process.cwd(), 'src/server/lib/events'));
const eventConstants = require(path.join(process.cwd(), 'src/server/constants/event.constants'));

const { TASK_COMPLETED, PROJECT_SHARED } = notificationConstants;

async function createNotification(type, data, userIDs) {
    if (!type || !data || !userIDs) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    if (!userIDs.length) return Return.service(null, [{ message: 'There should be at least one user that receives this notification.' }]);

    const notification = await NotificationModel.create({ type, data });

    await notification.addUsers(userIDs);
    
    return Return.service(notification);
}

async function createTaskCompletedNotification(taskID, taskCompletedBy) {
    if (!taskID) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const [task, taskErr] = await TaskService.getTask(taskID);

    if (taskErr) return [null, taskErr];

    const [projectUsers, projectUsersError] = await ProjectService.getProjectUsers(task.project_id);

    if (projectUsersError) return [null, projectUsersError];
    if (projectUsers && projectUsers.users && !projectUsers.users.length) return Return.service(null);
    
    const userIDsToSend = projectUsers.users
        .map(user => user.id)
        .filter(id => id !== taskCompletedBy);

    const [notification, notificationErr] = await createNotification(TASK_COMPLETED, { taskID, taskName: task.name, projectID: task.project_id }, userIDsToSend);

    if (notificationErr) return [null, notificationErr];

    const eventData = eventDataSchema.notification(
        notification.id,
        notification.type,
        notification.created_at,
        notification.data, 
        userIDsToSend
    );

    eventManager.emit(eventConstants.ON_NOTIFY, eventData);
    
    return Return.service(notification);
}

async function createProjectSharedNotification(projectID, sharedToUserID, sharedByUserID) {
    if (!projectID || !sharedToUserID) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const [project, projectErr] = await ProjectService.getProject(projectID);
    if (projectErr) return [null, projectErr];

    const [, sharedToUserErr] = await UserService.getUser(sharedToUserID);
    if (sharedToUserErr) return [null, sharedToUserErr];

    const [sharedByUser, sharedByUserErr] = await UserService.getUser(sharedByUserID);
    if (sharedByUserErr) return [null, sharedByUserErr];

    const [notification, notificationErr] = await createNotification(
        PROJECT_SHARED, 
        { 
            projectID, 
            projectName: project.name, 
            sharedByUserID, 
            sharedByUserName: `${sharedByUser.first_name } ${sharedByUser.last_name }` 
        }, 
        [sharedToUserID]
    );
    if (notificationErr) return [null, notificationErr];

    const eventData = eventDataSchema.notification(
        notification.id,
        notification.type,
        notification.created_at,
        notification.data, 
        [sharedToUserID]
    );

    eventManager.emit(eventConstants.ON_NOTIFY, eventData);
    
    return Return.service(notification);
}

async function getNotifications(userID, isRead, page, limit) {
    if (!userID) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ where: { id: userID }});

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    const order = [['created_at', 'DESC']];
    const options = { order };

    if (limit) options.limit = limit;
    
    if (typeof isRead === 'boolean') {
        options.through = { where: { is_read: isRead }};
    }

    const countOptions = { through: { where: { is_read: isRead }} };

    const userNotificationsCount = await user.countNotifications(countOptions).catch(err => console.error(err));

    if (page && limit) {
        options.offset = (page - 1) * limit;
    }

    const userNotifications = await user.getNotifications(options);

    return Return.service({ 
        notifications: userNotifications, 
        total: userNotificationsCount,
        hasMore: page * limit < userNotificationsCount
    });
}

async function markUserNotificationsAsRead(userID, notificationIDs) {
    if (!userID || !notificationIDs || notificationIDs.length === 0) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ where: { id: userID } });

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    const res = await user.addNotifications(
        notificationIDs,
        { through: { is_read: true } }
    );

    return Return.service(res);
}

exports.createTaskCompletedNotification = createTaskCompletedNotification;
exports.getNotifications = getNotifications;
exports.markUserNotificationsAsRead = markUserNotificationsAsRead;
exports.createProjectSharedNotification = createProjectSharedNotification;