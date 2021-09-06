import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"

export function getMyProfileAction() {
    return {
        type: actionTypes.GET_MY_PROFILE
    }
}

export function* getMyProfile() {
    try {
        const myProfile = yield axios.get('/api/me');
        yield put({ type: actionTypes.GET_MY_PROFILE_SUCCESS , payload: myProfile });
    } catch(err) {
        console.log(err);
    }
}
