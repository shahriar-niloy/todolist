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
        case actions.GET_PROJECT_SUCCESS:
            return { ...state, list: action.payload?.data?.data?.tasks || [] };
        case actions.DROP_TASK:
            return { ...state, list: [...action.payload.tasks] };
        case actions.BULK_UPDATE_TASKS_SUCCESS:
            return { ...state, list: [...action.payload.data.data] };
        default:
            break;
    }
    return state; 
}