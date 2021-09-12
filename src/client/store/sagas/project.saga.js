import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { createProject, deleteProject } from '../actions/project.action';

function* projectWatcher() {
    yield takeEvery(actionTypes.DELETE_PROJECT, deleteProject)
    yield takeEvery(actionTypes.CREATE_PROJECT, createProject)
}

export default projectWatcher;