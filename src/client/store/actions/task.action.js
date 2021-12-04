import axios from "axios";
import { put } from "redux-saga/effects";
import actionTypes from "../../constants/action.types"
import { reorderTasksOnComplete } from "../../services/task.service";
import { convertDateToUTC, processTaskList } from "../../utility";
import { getProjectAction } from "./project.action";

export function getTaskAction(taskID) {
    return {
        type: actionTypes.GET_TASK,
        payload: { taskID }
    }
}

export function* getTask(data) {
    try {
        const task = yield axios.get(`/api/tasks/${data.payload.taskID}`);
        yield put({ type: actionTypes.GET_TASK_SUCCESS , payload: task });
    } catch(err) {
        console.log(err);
    }
}

export function createTaskAction(data) {
    return {
        type: actionTypes.CREATE_TASK,
        payload:data
    }
}

export function* createTask(data) {
    try {
        const task = yield axios.post('/api/tasks', data.payload);
        yield put({ type: actionTypes.CREATE_TASK_SUCCESS , payload: task });
        yield put(getProjectAction(task.data.data.project_id));
    } catch(err) {
        console.log(err);
    }
}

export function createSubTaskAction(data) {
    return {
        type: actionTypes.CREATE_SUBTASK,
        payload:data
    }
}

export function* createSubTask(data) {
    try {
        const task = yield axios.post('/api/tasks', data.payload);
        yield put({ type: actionTypes.CREATE_SUBTASK_SUCCESS , payload: task });
        yield put(getProjectAction(task.data.data.project_id));
    } catch(err) {
        console.log(err);
    }
}

export function updateTaskAction(id, data) {
    return {
        type: actionTypes.UPDATE_TASK,
        payload: { id, data }
    }
}

export function* updateTask(data) {
    try {
        const task = yield axios.put(`/api/tasks/${data.payload.id}`, data.payload.data);
        yield put({ type: actionTypes.UPDATE_TASK_SUCCESS , payload: task });
        yield put(getProjectAction(task.data.data.project_id));
    } catch(err) {
        console.log(err);
    }
}

export function deleteTaskAction(taskID, projectID) {
    return {
        type: actionTypes.DELETE_TASK,
        payload: { taskID, projectID }
    }
}

export function* deleteTask(data) {
    try {
        const { data: task } = yield axios.delete(`/api/tasks/${data.payload.taskID}`);
        yield put({ type: actionTypes.DELETE_TASK_SUCCESS , payload: task });
        yield put(getProjectAction(task.data.project_id));
    } catch(err) {
        console.log(err);
    }
}

export function dropTask(tasks) {
    return {
        type: actionTypes.DROP_TASK,
        payload: { tasks }
    }
}

export function bulkUpdateTasksAction(tasks, onSuccess, onError) {
    return {
        type: actionTypes.BULK_UPDATE_TASKS,
        payload: { tasks },
        onSuccess,
        onError
    }
}

export function* bulkUpdateTasks(data) {
    const { onSuccess, onError } = data;

    try {
        const tasks = yield axios.put('/api/tasks', data.payload.tasks);
        
        onSuccess && onSuccess();

        yield put({ type: actionTypes.BULK_UPDATE_TASKS_SUCCESS , payload: tasks });
    } catch(err) {
        onError && onError(err);
    }
}

export function getTasksAction(scheduledDate) {
    return {
        type: actionTypes.GET_TASKS,
        payload: {
            scheduledDate
        }
    }
}

export function* getTasks(data) {
    const { onSuccess, onError, payload } = data;
    
    try {
        let url = '/api/tasks';

        if (payload.scheduledDate) url += `?scheduled_date=${payload.scheduledDate}`;

        const tasks = yield axios.get(url);

        onSuccess && onSuccess(tasks);

        yield put({ type: actionTypes.GET_TASKS_SUCCESS, payload: tasks });
    } catch(err) {
        onError && onError(err);
    }
}

export function getTodayTasksAction() {
    let dateToday = new Date();
    
    dateToday = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());

    dateToday = convertDateToUTC(dateToday);

    return getTasksAction(dateToday.toISOString());
}

export function getToggleTaskCompletedAction(taskID, projectID, isCompleted, onSuccess) {
    return {
        type: actionTypes.TOGGLE_TASK_COMPLETED,
        payload: {
            taskID,
            projectID,
            isCompleted
        },
        onSuccess
    }
}

export function* toggleTaskCompleted(data) {
    try {
        const { onSuccess } = data;
        const { taskID, projectID, isCompleted } = data.payload;
        
        const { data: project } = yield axios.get(`/api/projects/${projectID}`);

        const { tree: tasks } = processTaskList(project?.data?.tasks);

        const rearrangedTasks = reorderTasksOnComplete(taskID, tasks, isCompleted);
        
        yield axios.put('/api/tasks', rearrangedTasks);

        onSuccess && onSuccess();
        
        yield put({ type: actionTypes.TOGGLE_TASK_COMPLETED_SUCCESS, payload: rearrangedTasks });
    } catch(err) {
        console.log(err);
    }
}