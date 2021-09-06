import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticate.saga';
import userSaga from './user.saga';

export default function* rootSaga() {
    yield all([
        authenticateSaga(),
        userSaga()
    ]);
}