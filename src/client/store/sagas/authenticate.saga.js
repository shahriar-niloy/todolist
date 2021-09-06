import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { login } from '../actions/authenticate.action';

function* authenticationWatcher() {
    yield takeEvery(actionTypes.LOGIN, login);
}

export default authenticationWatcher;