const path = require('path');
const { RECENT_NOTIFICATIONS_LIMIT } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));

const UserService = require(path.join(process.cwd(), 'src/server/services/user'));
const NotificationService = require(path.join(process.cwd(), 'src/server/services/notification'));
const { UserViewModels } = require(path.join(process.cwd(), 'src/server/view-models'));
const { Response } = require(path.join(process.cwd(), 'src/server/schemas'));

async function getProfile(req, res) {
    const successResponse = new Response.success();

    let users = await UserService.getUsers();

    users = users.map(user => UserViewModels.profile(user));

    successResponse.data = users;

    res.json(successResponse);
}

async function getMyProfile(req, res) {
    try {
        const successResponse = new Response.success();
        const errorResponse = new Response.error();

        const [user] = await UserService.getUser(req.user.id);

        if (!user) {
            errorResponse.addError('User does not exists.', '');
            return res.status(400).json(errorResponse);
        }

        successResponse.data = UserViewModels.profile(user);

        res.json(successResponse);
    } catch(err) {
        console.error(err);
    }
}

async function addProject(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const user_id = req.params.id;
    const { project_id, is_owner } = req.body;

    if (!user_id || !project_id) {
        errorResponse.addError('Invalid parameters', '');
        return res.status(400).json(errorResponse);
    }

    const [user] = await UserService.getUser(user_id);

    if (!user) {
        errorResponse.addError('User not found.', '');
        return res.status(400).json(errorResponse);
    }
    
    await user.addProject(project_id, { through: { is_owner: is_owner || false } });

    successResponse.data = UserViewModels.profile(user);

    res.json(successResponse);
}

async function getUserProjects(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const { id } = req.params;

    if (!id) {
        errorResponse.addError('Invalid parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const [user] = await UserService.getUser(id);

    if (!user) {
        errorResponse.addError('User not found.', '');
        return res.status(400).json(errorResponse);
    }

    successResponse.data = UserViewModels.projects(user);

    res.json(successResponse);
}

async function searchUsers(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();

    const query = req.query.query;
    const notInProject = req.query.not_in_project;

    if (!query) {
        errorResponse.addError('Invalid query parameters.', '');
        return res.status(400).json(errorResponse);
    }

    const users = await UserService.searchUsers(query, notInProject);

    successResponse.data = users.map(user => UserViewModels.profile(user));

    res.json(successResponse);
}

async function getMyNotifications(req, res) {
    const successResponse = new Response.success();
    const errorResponse = new Response.error();
    
    const userID = req.user.id;
    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 10;

    const [{ notifications, total, hasMore }, err] = await NotificationService.getNotifications(userID, false, page, RECENT_NOTIFICATIONS_LIMIT);

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    successResponse.data = notifications.map(notification => UserViewModels.notification(notification));
    successResponse.metadata = { total, page, limit, hasMore };

    res.json(successResponse);
}

async function markMyNotificationsAsRead(req, res) {
    const errorResponse = new Response.error();
    
    const userID = req.user.id;
    const notificationIDs = req.body.notification_ids;

    const [, err] = await NotificationService.markUserNotificationsAsRead(userID, notificationIDs);

    if (err) {
        err.forEach(e => errorResponse.addError(e.message, ''));
        return res.status(400).json(errorResponse);
    }

    res.sendStatus(200);
}

exports.getProfile = getProfile;
exports.addProject = addProject;
exports.getUserProjects = getUserProjects;
exports.getMyProfile = getMyProfile;
exports.searchUsers = searchUsers;
exports.getMyNotifications = getMyNotifications;
exports.markMyNotificationsAsRead = markMyNotificationsAsRead;