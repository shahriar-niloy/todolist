import actions from "../../constants/action.types";

const initialState = {
    details: null,
    shareForm: {}
};

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PROJECT_SUCCESS:
            return { ...state, details: action.payload.data.data };
        case actions.GET_PROJECT_USERS_SUCCESS:
            return { ...state, shareForm: action.payload.data };
        default:
            break;
    }
    return state; 
}