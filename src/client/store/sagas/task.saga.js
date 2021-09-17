import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createTask, updateTask, deleteTask, getTask } from '../actions/task.action';

function* taskWatcher() {
    yield takeEvery(actionTypes.GET_TASK, getTask);
    yield takeEvery(actionTypes.CREATE_TASK, createTask);
    yield takeEvery(actionTypes.UPDATE_TASK, updateTask);
    yield takeEvery(actionTypes.DELETE_TASK, deleteTask);
}

export default taskWatcher;