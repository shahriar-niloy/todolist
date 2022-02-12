import actions from "../../constants/action.types";
import { processTaskList } from "../../utility";

const initialState = {
    details: null,
    list: {}
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_TASK_SUCCESS:
            const taskDetails = action.payload.data.data;
            const parentTask = state.list?.flat?.find(task => task.id === taskDetails.parent_task_id);
            
            if (parentTask) taskDetails.parentTask = parentTask;

            return { ...state, details: taskDetails };
        case actions.CREATE_TASK_SUCCESS:
            return { ...state, details: action.payload.data.data };
        case actions.GET_PROJECT_SUCCESS:{
            const tasks = action.payload?.data?.data?.tasks;

            return { 
                ...state, 
                list: { ...processTaskList(tasks) }
            };
        }
        case actions.DROP_TASK:
            return { 
                ...state, 
                list: {
                    ...processTaskList(action.payload.tasks)
                } 
            };
        case actions.BULK_UPDATE_TASKS_SUCCESS: {
            const tasks = action.payload.data.data;

            return { 
                ...state, 
                list: { ...processTaskList(tasks) }
            };
        }
        case actions.GET_TASKS_SUCCESS: {
            const tasks = action.payload.data.data;

            return { 
                ...state, 
                list: {
                    flat: tasks
                }
            };
        }
        case actions.GET_TASK_ATTACHMENTS_SUCCESS: {
            return { 
                ...state, 
                attachments: action.payload
            };
        }
        case actions.GET_TASK_COMMENTS_SUCCESS: {
            return { 
                ...state, 
                comments: action.payload
            };
        }
        default:
            break;
    }
    return state; 
}