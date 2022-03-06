import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types";

export function getIconsAction(onSuccess) {
    return {
        type: actionTypes.GET_ICONS,
        onSuccess
    }
}

export function* getIcons(data) {
    try {
        const { onSuccess } = data;
        let { data: icons } = yield axios({ method: 'get', url: '/api/icons' });
        
        onSuccess && onSuccess(icons);

        yield put({ type: actionTypes.GET_ICONS_SUCCESS, payload: icons });
    } catch(err) {
        console.log(err);
    }
}