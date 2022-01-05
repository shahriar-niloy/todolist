import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"
import { getTaskAttachmentAction } from "./task.action";

export function deleteAttachmentAction(id) {
    return {
        type: actionTypes.DELETE_ATTACHMENT,
        payload: { id }
    }
}

export function* deleteAttachment(data) {
    try {
        const { data: attachment } = yield axios.delete(`/api/attachment/${data.payload.id}`);
        yield put({ type: actionTypes.DELETE_TASK_SUCCESS , payload: attachment });
        yield put(getTaskAttachmentAction(attachment.data.task_id));
    } catch(err) {
        console.log(err);
    }
}

