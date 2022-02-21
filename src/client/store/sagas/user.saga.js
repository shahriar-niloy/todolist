import { takeEvery, debounce, takeLatest } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createUser, debouncedSearchUsers, getMyNotifications, getMyProfile, markMyNotificationsAsRead, searchUsers, updateMyEmail, updateMyPassword, updateMyProfile } from '../actions/user.actions';
import appConstants from '../../constants/app.constants';

function* userWatcher() {
    yield takeEvery(actionTypes.GET_MY_PROFILE, getMyProfile);
    yield debounce(appConstants.AUTOSUGGEST_DEBOUNCE_TIME_IN_MS, actionTypes.DEBOUNCE_SEARCH_USERS, debouncedSearchUsers);
    yield takeLatest(actionTypes.SEARCH_USERS, searchUsers);
    yield takeLatest(actionTypes.GET_MY_NOTIFICATIONS, getMyNotifications);
    yield takeLatest(actionTypes.MARK_MY_NOTIFICATIONS_AS_READ, markMyNotificationsAsRead);
    yield takeLatest(actionTypes.UPDATE_MY_PROFILE, updateMyProfile);
    yield takeLatest(actionTypes.UPDATE_MY_EMAIL, updateMyEmail);
    yield takeLatest(actionTypes.UPDATE_MY_PASSWORD, updateMyPassword);
    yield takeEvery(actionTypes.CREATE_USER, createUser);
}

export default userWatcher;