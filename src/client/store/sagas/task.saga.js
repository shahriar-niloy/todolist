import { takeEvery, takeLatest } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createTask, updateTask, deleteTask, getTask, bulkUpdateTasks, createSubTask, getTasks, toggleTaskCompleted } from '../actions/task.action';

function* taskWatcher() {
    yield takeEvery(actionTypes.GET_TASK, getTask);
    yield takeEvery(actionTypes.CREATE_TASK, createTask);
    yield takeEvery(actionTypes.CREATE_SUBTASK, createSubTask);
    yield takeEvery(actionTypes.UPDATE_TASK, updateTask);
    yield takeEvery(actionTypes.DELETE_TASK, deleteTask);
    yield takeEvery(actionTypes.TOGGLE_TASK_COMPLETED, toggleTaskCompleted);
    yield takeLatest(actionTypes.BULK_UPDATE_TASKS, bulkUpdateTasks);
    yield takeLatest(actionTypes.GET_TASKS, getTasks);
}

export default taskWatcher;