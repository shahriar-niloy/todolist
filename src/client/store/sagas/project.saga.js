import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { getProject, createProject, updateProject, deleteProject, shareProject, getProjectUsers, revokeProjectUserAccess } from '../actions/project.action';

function* projectWatcher() {
    yield takeEvery(actionTypes.GET_PROJECT, getProject);
    yield takeEvery(actionTypes.CREATE_PROJECT, createProject);
    yield takeEvery(actionTypes.UPDATE_PROJECT, updateProject);
    yield takeEvery(actionTypes.DELETE_PROJECT, deleteProject);
    yield takeEvery(actionTypes.SHARE_PROJECT, shareProject);
    yield takeEvery(actionTypes.GET_PROJECT_USERS, getProjectUsers);
    yield takeEvery(actionTypes.REVOKE_PROJECT_USER_ACCESS, revokeProjectUserAccess);
}

export default projectWatcher;