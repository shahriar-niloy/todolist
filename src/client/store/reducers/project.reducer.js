import actions from "../../constants/action.types";

const initialState = {
    details: null
};

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PROJECT_SUCCESS:
            return { ...state, details: action.payload.data.data };
        default:
            break;
    }
    return state; 
}