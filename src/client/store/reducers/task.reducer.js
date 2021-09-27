import actions from "../../constants/action.types";

const initialState = {
    details: null,
    list: {}
};

function processTaskList(tasks) {
    const taskToSubtask = new Map();
    const subtaskToTask = new Map();
    const tasksByID = {};

    for (const task of tasks) {
        const parent_id = task.parent_task_id;
        
        taskToSubtask.has(parent_id)
            ? taskToSubtask.get(parent_id).push(task)
            : taskToSubtask.set(parent_id, [task]);

        subtaskToTask.set(task.id, parent_id);
        tasksByID[task.id] = task;
    }

    const parentTasks = tasks.filter(task => !task.parent_task_id);

    parentTasks.forEach((parentTask, index) => {
        function createSubTaskHierarchy(taskID) {
            const children = taskToSubtask.get(taskID);
            
            if (!children || !children.length) return null;

            let i = 0;
            for (const child of children) {
                children[i].subtasks = createSubTaskHierarchy(child.id);
                ++i;
            }
            
            return children;
        }

        const subTaskHierarchy = createSubTaskHierarchy(parentTask.id);

        parentTasks[index].subtasks = subTaskHierarchy;
    });

    return { 
        flat: tasks,
        tree: parentTasks,
        taskToSubtask,
        subtaskToTask,
        tasksByID
    }
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_TASK_SUCCESS:
            return { ...state, details: action.payload.data.data };
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
        default:
            break;
    }
    return state; 
}