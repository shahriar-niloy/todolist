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
            const tasks = [...state.list];

            const sourceIndex = tasks.findIndex(task => task.id === action.payload.source);
            const targetIndex = tasks.findIndex(task => task.id === action.payload.target);
            
            tasks.splice(targetIndex, 0, tasks.splice(sourceIndex, 1)[0]);

            return { ...state, list: tasks };
        default:
            break;
    }
    return state; 
}