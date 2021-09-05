import actions from "../../constants/action.types";

const initialState = {
    profile: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return { ...state, profile: action.payload.data };
        default:
            break;
    }
    return state; 
}