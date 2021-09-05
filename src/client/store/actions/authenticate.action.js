import axios from 'axios';
import { put } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';

export function* login(action) {
    try {
        const { email, password } = action.payload;
        const user = yield axios.post('/api/login', { email, password });
        yield put({ type: actionTypes.LOGIN_SUCCESS, payload: user });
    } catch(err) {
        console.error(err);
    }
}

export function loginActionCreator(email, password) {
    return {
        type: actionTypes.LOGIN,
        payload: { email, password }
    };
}

