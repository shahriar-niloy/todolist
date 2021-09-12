import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { getProject, createProject, updateProject, deleteProject } from '../actions/project.action';

function* projectWatcher() {
    yield takeEvery(actionTypes.GET_PROJECT, getProject);
    yield takeEvery(actionTypes.CREATE_PROJECT, createProject);
    yield takeEvery(actionTypes.UPDATE_PROJECT, updateProject);
    yield takeEvery(actionTypes.DELETE_PROJECT, deleteProject);
}

export default projectWatcher;