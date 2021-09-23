import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { login, logout } from '../actions/authenticate.action';

function* authenticationWatcher() {
    yield takeEvery(actionTypes.LOGIN, login);
    yield takeEvery(actionTypes.LOGOUT, logout);
}

export default authenticationWatcher;