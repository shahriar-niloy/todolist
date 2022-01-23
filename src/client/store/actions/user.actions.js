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
export function debouncedSearchUsersAction(query, notInProject) {
    return {
        type: actionTypes.DEBOUNCE_SEARCH_USERS,
        payload: { query, notInProject }
    }
}

export function* debouncedSearchUsers(data) {
    yield put({ type: actionTypes.SEARCH_USERS, payload: data.payload });
}

export function searchUsersAction(query, notInProject) {
    return {
        type: actionTypes.SEARCH_USERS,
        payload: { query, notInProject }
    }
}

export function* searchUsers(data) {
    const queryParams = new URLSearchParams();
    
    queryParams.append('query', data.payload.query);
    queryParams.append('not_in_project', data.payload.notInProject);

    try {
        const { data: users } = yield axios.get(`/api/users/search?${queryParams}`);
        yield put({ type: actionTypes.SEARCH_USERS_SUCCESS , payload: users });
    } catch(err) {
        console.log(err);
    }
}

export function clearSearchUsersResultAction() {
    return {
        type: actionTypes.CLEAR_SEARCH_USERS_RESULT
    }
}