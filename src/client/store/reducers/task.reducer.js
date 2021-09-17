import actions from "../../constants/action.types";

const initialState = {
    details: null
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case actions.TASK__CREATE_SUCCESS:
            return { ...state, details: action.payload.data };
        default:
            break;
    }
    return state; 
}