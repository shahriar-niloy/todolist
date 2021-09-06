import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { getMyProfile } from '../actions/user.actions';

function* userWatcher() {
    yield takeEvery(actionTypes.GET_MY_PROFILE, getMyProfile);
}

export default userWatcher;