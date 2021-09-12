import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"

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
    } catch(err) {
        console.log(err);
    }
}
