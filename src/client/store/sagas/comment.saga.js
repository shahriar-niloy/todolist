import { takeEvery, takeLatest } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createComment, deleteComment } from '../actions/comment.actions';

function* commentWatcher() {
    yield takeEvery(actionTypes.CREATE_COMMENT, createComment);
    yield takeLatest(actionTypes.DELETE_COMMENT, deleteComment);
}

export default commentWatcher;