import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createTask } from '../actions/task.action';

function* taskWatcher() {
    yield takeEvery(actionTypes.CREATE_TASK, createTask);
}

export default taskWatcher;