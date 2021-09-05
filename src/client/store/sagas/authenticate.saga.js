import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { login } from '../actions/authenticate.action';

function* userWatcher() {
    yield takeEvery(actionTypes.LOGIN, login);
}

export default userWatcher;