import actions from "../../constants/action.types";

const initialState = {
    details: null
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_TASK_SUCCESS:
            return { ...state, details: action.payload.data.data };
        case actions.CREATE_TASK_SUCCESS:
            return { ...state, details: action.payload.data.data };
        default:
            break;
    }
    return state; 
}