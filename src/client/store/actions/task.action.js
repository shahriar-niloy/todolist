import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"
import { getProjectAction } from "./project.action";

export function createTaskAction(data) {
    return {
        type: actionTypes.CREATE_TASK,
        payload:data
    }
}

export function* createTask(data) {
    try {
        const task = yield axios.post('/api/tasks', data.payload);
        yield put({ type: actionTypes.CREATE_TASK_SUCCESS , payload: task });
        yield put(getProjectAction(data.payload.project_id));
    } catch(err) {
        console.log(err);
    }
}