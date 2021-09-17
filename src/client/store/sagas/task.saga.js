import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createTask, deleteTask } from '../actions/task.action';

function* taskWatcher() {
    yield takeEvery(actionTypes.CREATE_TASK, createTask);
    yield takeEvery(actionTypes.DELETE_TASK, deleteTask);
}

export default taskWatcher;