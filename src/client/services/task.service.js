function reorderTasks(tasksTree, taskID, isCompleted, taskFound=false) {
    if (!tasksTree || !tasksTree.length) return [[], false];

    const taskIndex = tasksTree.findIndex(task => task.id === taskID);
    let rearrangedTasks = tasksTree;
    let taskFoundInCurrentList = taskIndex !== -1;
    let tasksOfPreviousLevel = [];
    let taskFoundInPreviousLevels = false;

    if (taskFoundInCurrentList) tasksTree[taskIndex].is_completed =  isCompleted;

    for (let i = 0; i < rearrangedTasks.length; ++i) {
        const [accumulatedTaskListSoFar, taskFoundInChild] = reorderTasks(rearrangedTasks[i].subtasks, taskID, isCompleted, taskFound || taskFoundInCurrentList);
        
        if (taskFoundInChild && !isCompleted) rearrangedTasks[i].is_completed = false;
        
        if (taskFoundInChild) taskFoundInPreviousLevels = true;
    
        tasksOfPreviousLevel = [...tasksOfPreviousLevel, ...accumulatedTaskListSoFar];
    }

    if (taskFoundInCurrentList || !isCompleted || !taskFound) {
        rearrangedTasks = [...rearrangedTasks.filter(task => !task.is_completed), ...rearrangedTasks.filter(task => task.is_completed)];
    }

    return [[...tasksOfPreviousLevel, ...rearrangedTasks], taskFoundInCurrentList || taskFoundInPreviousLevels];
}

export const reorderTasksOnComplete = (taskID, taskTree, isCompleted) => {
    const [rearrangedTasks] = reorderTasks(taskTree, taskID, isCompleted);

    return rearrangedTasks.map((task, index) => {
        return { 
            id: task.id, 
            order: index,
            is_completed: task.is_completed
        };
    });
}