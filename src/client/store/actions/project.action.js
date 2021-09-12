import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"
import { getMyProfileAction } from "./user.actions";

export function getProjectAction(id) {
    return {
        type: actionTypes.GET_PROJECT,
        payload: { id }
    }
}

export function* getProject(data) {
    try {
        const project = yield axios.get(`/api/projects/${data.payload.id}`);
        yield put({ type: actionTypes.GET_PROJECT_SUCCESS , payload: project });
    } catch(err) {
        console.log(err);
    }
}

export function createProjectAction(data) {
    return {
        type: actionTypes.CREATE_PROJECT,
        payload:data
    }
}

export function* createProject(data) {
    try {
        const project = yield axios.post('/api/projects', data.payload);
        yield put({ type: actionTypes.CREATE_PROJECT_SUCCESS , payload: project });
        yield put(getMyProfileAction());
    } catch(err) {
        console.log(err);
    }
}

export function deleteProjectAction(id) {
    return {
        type: actionTypes.DELETE_PROJECT,
        payload: { id }
    }
}

export function* deleteProject(data) {
    try {
        yield axios.delete(`/api/projects/${data.payload.id}`);
        yield put({ type: actionTypes.DELETE_PROJECT_SUCCESS });
        yield put(getMyProfileAction());
    } catch(err) {
        console.log(err);
    }
}

export function updateProjectAction(id, data) {
    return {
        type: actionTypes.UPDATE_PROJECT,
        payload: {
            id,
            body: data
        }
    }
}

export function* updateProject(data) {
    try {
        const project = yield axios.put(`/api/projects/${data.payload.id}`, data.payload.body);
        yield put({ type: actionTypes.UPDATE_PROJECT_SUCCESS , payload: project });
        yield put(getMyProfileAction());
    } catch(err) {
        console.log(err);
    }
}