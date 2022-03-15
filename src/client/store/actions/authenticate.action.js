import axios from 'axios';
import { put } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';

export function* login(action) {
    const { payload: { email, password }, onSuccess, onError } = action;
    try {
        const user = yield axios.post('/api/login', { email, password });
        
        onSuccess && onSuccess(user);

        yield put({ type: actionTypes.LOGIN_SUCCESS, payload: user });
    } catch(err) {
        console.error(err);
        onError && onError(err.response.data);
    }
}

export function loginActionCreator(email, password, onSuccess, onError) {
    return {
        type: actionTypes.LOGIN,
        payload: { email, password },
        onSuccess,
        onError
    };
}

export function* logout() {
    try {
        yield axios.get('/api/logout');
        yield put({ type: actionTypes.LOGOUT_SUCCESS });
    } catch(err) {
        console.log(err);
    }
}

export function logoutActionCreator() {
    return { type: actionTypes.LOGOUT };
}