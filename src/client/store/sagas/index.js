import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticate.saga';
import userSaga from './user.saga';
import projectSaga from './project.saga';
import taskWatcher from './task.saga';
import attachmentWatcher from './attachment.saga';
import commentWatcher from './comment.saga';
import iconWatcher from './icon.saga';

export default function* rootSaga() {
    yield all([
        authenticateSaga(),
        userSaga(),
        projectSaga(),
        taskWatcher(),
        attachmentWatcher(),
        commentWatcher(),
        iconWatcher()
    ]);
}