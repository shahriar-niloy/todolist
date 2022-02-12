import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types";

export function createCommentAction(data, onSuccess) {
    return {
        type: actionTypes.CREATE_COMMENT,
        payload: data,
        onSuccess
    }
}

export function* createComment(data) {
    try {
        const { payload, onSuccess } = data;
        let { data: comment } = yield axios({ method: 'post', url: '/api/comment', data: payload });
        
        onSuccess && onSuccess(comment);

        yield put({ type: actionTypes.CREATE_COMMENT_SUCCESS, payload: comment });
    } catch(err) {
        console.log(err);
    }
}

export function deleteCommentAction(id, onSuccess) {
    return {
        type: actionTypes.DELETE_COMMENT,
        payload: { id },
        onSuccess
    }
}

export function* deleteComment(data) {
    try {
        const { payload, onSuccess } = data;

        let { data: comment } = yield axios({ method: 'delete', url: `/api/comment/${payload.id}` });
        
        onSuccess && onSuccess(comment);

        yield put({ type: actionTypes.DELETE_COMMENT_SUCCESS, payload: comment });
    } catch(err) {
        console.log(err);
    }
}