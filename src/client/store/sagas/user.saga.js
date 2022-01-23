import { takeEvery, debounce, takeLatest } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { debouncedSearchUsers, getMyProfile, searchUsers } from '../actions/user.actions';
import appConstants from '../../constants/app.constants';

function* userWatcher() {
    yield takeEvery(actionTypes.GET_MY_PROFILE, getMyProfile);
    yield debounce(appConstants.AUTOSUGGEST_DEBOUNCE_TIME_IN_MS, actionTypes.DEBOUNCE_SEARCH_USERS, debouncedSearchUsers);
    yield takeLatest(actionTypes.SEARCH_USERS, searchUsers);
}

export default userWatcher;