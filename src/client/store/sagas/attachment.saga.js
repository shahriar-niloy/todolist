import { takeLatest } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { deleteAttachment } from '../actions/attachment.action';

function* attachmentWatcher() {
    yield takeLatest(actionTypes.DELETE_ATTACHMENT, deleteAttachment);
}

export default attachmentWatcher;