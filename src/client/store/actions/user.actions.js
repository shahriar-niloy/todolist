import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"

export function getMyProfileAction() {
    return {
        type: actionTypes.GET_MY_PROFILE
    }
}

export function* getMyProfile() {
    try {
        const myProfile = yield axios.get('/api/me');
        yield put({ type: actionTypes.GET_MY_PROFILE_SUCCESS , payload: myProfile });
    } catch(err) {
        console.log(err);
    }
}

export function getMyProjectsAction() {
    return {
        type: actionTypes.GET_MY_PROJECTS
    }
}

export function* getMyProjects() {
    try {
        const myProjects = yield axios.get(`/api/me/projects`);
        yield put({ type: actionTypes.GET_MY_PROJECTS_SUCCESS, payload: myProjects });
    } catch(err) {
        console.log(err);
    }
}

export function debouncedSearchUsersAction(query, notInProject, onSuccess) {
    return {
        type: actionTypes.DEBOUNCE_SEARCH_USERS,
        payload: { query, notInProject, onSuccess }
    }
}

export function* debouncedSearchUsers(data) {
    yield put({ type: actionTypes.SEARCH_USERS, payload: data.payload });
}

export function* searchUsers(data) {
    const queryParams = new URLSearchParams();

    queryParams.append('query', data.payload.query);
    queryParams.append('not_in_project', data.payload.notInProject);

    const { onSuccess } = data.payload;

    try {
        const { data: users } = yield axios.get(`/api/users/search?${queryParams}`);

        onSuccess && onSuccess(users);

        yield put({ type: actionTypes.SEARCH_USERS_SUCCESS , payload: users });
    } catch(err) {
        console.log(err);
    }
}

export function clearSearchUsersResultAction() {
    return {
        type: actionTypes.CLEAR_SEARCH_USERS_RESULT
    }
}

export function getMyNotificationsAction(page, shouldAppend) {
    return {
        type: actionTypes.GET_MY_NOTIFICATIONS,
        payload: { page, shouldAppend }
    }
}

export function* getMyNotifications(data) {
    try {
        const page = data.payload.page;
        const shouldAppend = data.payload.shouldAppend || false;
        const query = new URLSearchParams();
        page && query.append('page', page);

        yield put({ type: actionTypes.GET_MY_NOTIFICATIONS_PENDING });

        const { data: notifications } = yield axios.get(`/api/me/notifications?${query}`);

        yield put({ type: actionTypes.GET_MY_NOTIFICATIONS_SUCCESS , payload: { notifications, shouldAppend } });
    } catch(err) {
        console.log(err);
    }
}

export function markMyNotificationsAsReadAction(notificationIDs) {
    return {
        type: actionTypes.MARK_MY_NOTIFICATIONS_AS_READ,
        payload: { notificationIDs }
    }
}

export function* markMyNotificationsAsRead(data) {
    try {
        yield axios.put('/api/me/notifications/mark-as-read', { notification_ids: data.payload.notificationIDs });
        yield put(getMyNotificationsAction());
    } catch(err) {
        console.log(err);
    }
}

export function updateMyProfileAction(data, onSuccess) {
    return {
        type: actionTypes.UPDATE_MY_PROFILE,
        payload: data,
        onSuccess
    }
}

export function* updateMyProfile(data) {
    try {
        const myProfile = yield axios.put('/api/me', data.payload);
        data.onSuccess && data.onSuccess(myProfile);
        yield put({ type: actionTypes.UPDATE_MY_PROFILE_SUCCESS , payload: myProfile });
    } catch(err) {
        console.log(err);
    }
}

export function updateMyEmailAction(data) {
    return {
        type: actionTypes.UPDATE_MY_EMAIL,
        payload: data
    }
}

export function* updateMyEmail(data) {
    try {
        const profile = yield axios.put('/api/me/email', data.payload);
        yield put({ type: actionTypes.UPDATE_MY_EMAIL_SUCCESS , payload: profile });
    } catch(err) {
        console.log(err);
    }
}

export function updateMyPasswordAction(data) {
    return {
        type: actionTypes.UPDATE_MY_PASSWORD,
        payload: data
    }
}

export function* updateMyPassword(data) {
    try {
        const profile = yield axios.put('/api/me/password', data.payload);
        yield put({ type: actionTypes.UPDATE_MY_EMAIL_SUCCESS , payload: profile });
    } catch(err) {
        console.log(err);
    }
}

export function createUserAction(data, onSuccess) {
    return {
        type: actionTypes.CREATE_USER,
        payload: data,
        onSuccess
    }
}

export function* createUser(data) {
    try {
        const profile = yield axios.post('/api/users', data.payload);

        data.onSuccess && data.onSuccess(profile);

        yield put({ type: actionTypes.CREATE_USER_SUCCESS , payload: profile });
    } catch(err) {
        console.log(err);
    }
}

export function forgotPasswordAction(data, onSuccess) {
    return {
        type: actionTypes.FORGOT_PASSWORD,
        payload: data,
        onSuccess
    }
}

export function* forgotPassword(data) {
    try {
        const { data: res } = yield axios.post('/api/users/forgot-password', data.payload);

        data.onSuccess && data.onSuccess(res);

        yield put({ type: actionTypes.FORGOT_PASSWORD_SUCCESS , payload: res });
    } catch(err) {
        console.log(err);
    }
}

export function resetPasswordAction(data, onSuccess) {
    return {
        type: actionTypes.RESET_PASSWORD,
        payload: data,
        onSuccess
    }
}

export function* resetPassword(data) {
    try {
        const { data: res } = yield axios.post('/api/users/reset-password', data.payload);

        data.onSuccess && data.onSuccess(res);

        yield put({ type: actionTypes.RESET_PASSWORD_SUCCESS , payload: res });
    } catch(err) {
        console.log(err);
    }
}