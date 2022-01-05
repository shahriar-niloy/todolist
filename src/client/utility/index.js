import moment from 'moment';

export function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null)
        .join('');
}

export function convertDateToUTC (date) {
    if (!date) throw new Error('Date has not been provided.');

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return date;
}

export function processTaskList(tasks) {
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

export function convertBufferToBlob (buffer, mimetype) {
    return mimetype 
        ? new Blob([new Uint8Array(buffer)], { type: mimetype })
        : new Blob([new Uint8Array(buffer)]);
} 

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function convertTimeToWords (time) {
    return moment(time).fromNow();
}