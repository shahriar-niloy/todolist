import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticate.saga';
import userSaga from './user.saga';
import projectSaga from './project.saga';
import taskWatcher from './task.saga';

export default function* rootSaga() {
    yield all([
        authenticateSaga(),
        userSaga(),
        projectSaga(),
        taskWatcher()
    ]);
}