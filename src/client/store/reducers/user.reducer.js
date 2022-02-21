import actions from "../../constants/action.types";

const initialState = {
    profile: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return { ...state, profile: action.payload.data };
        case actions.GET_MY_PROFILE_SUCCESS:
            return { ...state, profile: action.payload.data.data };
        case actions.UPDATE_MY_PROFILE_SUCCESS:
            return { ...state, profile: action.payload.data.data };
        case actions.UPDATE_MY_EMAIL_SUCCESS:
            return { ...state, profile: action.payload.data.data };
        case actions.UPDATE_MY_PASSWORD_SUCCESS:
            return { ...state, profile: action.payload.data.data };
        case actions.SEARCH_USERS_SUCCESS:
            return { ...state, suggestedUsers: action.payload.data };
        case actions.CLEAR_SEARCH_USERS_RESULT:
            return { ...state, suggestedUsers: [] };
        default:
            break;
    }
    return state; 
}