import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskEditor from '../../components/editor/task-editor.component';
import Modal from '../../components/modal';
import { getProjectAction } from '../../store/actions/project.action';
import { bulkUpdateTasksAction, deleteTaskAction, dropTask } from '../../store/actions/task.action';
import ProjectMenuContainer from '../project/project-menu.container';
import TaskFormContainer from './task-form.container';
import DROP_HIGHLIGHT_DRAWERS from '../../constants/taskitem-drop-highlight.constant';

const taskFormModalStyle = {
    content: {
      minWidth: '700px'
    }
};

function TaskEditorContainer() {
    const dispatch = useDispatch();
    const params = useParams();
    const projectID = params.id;
    const project = useSelector(state => state.project.details);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskID, setTaskID] = useState(null);
    const [openTaskFormInDetailView, setOpenTaskFormInDetailView] = useState(false);
    const [showCompletedTasks, setShowCompletedTask] = useState(false);
    const { 
        flat: taskList, 
        tree: taskTree, 
        taskToSubtask, 
        subtaskToTask
    } = useSelector(state => state.task.list);

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

    const reorderTasksOnComplete = (taskID, isCompleted) => {
        const [rearrangedTasks] = reorderTasks(taskTree, taskID, isCompleted);

        return rearrangedTasks.map((task, index) => {
            return { 
                id: task.id, 
                order: index,
                is_completed: task.is_completed
            };
        });
    }

    const handleTaskAddIconClick = () => {
        setTaskID(null);
        setShowTaskForm(true);
    }

    const handleTaskDelete = (id) => {
        const response = confirm('Are you sure you want to delete the task?');
        if (response) dispatch(deleteTaskAction(id, project?.id));
    }

    const handleTaskEdit = (id) => {
        setShowTaskForm(true);
        setTaskID(id);
    }

    const handleTaskDrop = useCallback((source, target, droppedOn) => {        
        const updatedTaskToSubtask = new Map(taskToSubtask);

        const sourceParent = subtaskToTask.get(source);
        const targetParent = droppedOn === DROP_HIGHLIGHT_DRAWERS.SUBTASK 
            ? target
            : subtaskToTask.get(target);

        if (sourceParent === targetParent) {
            const subtasks = taskToSubtask.get(sourceParent);
            
            const sourceIndex = subtasks.findIndex(task => task.id === source);
            let targetIndex = subtasks.findIndex(task => task.id === target);

            if (sourceIndex > targetIndex && droppedOn === DROP_HIGHLIGHT_DRAWERS.BOTTOM) {
                targetIndex++;
            } else if (targetIndex > sourceIndex && !(droppedOn === DROP_HIGHLIGHT_DRAWERS.BOTTOM)) {
                targetIndex--;
            }

            subtasks.splice(targetIndex, 0, subtasks.splice(sourceIndex, 1)[0]);

            for (let i = 0; i < subtasks.length; ++i) subtasks[i].order = i;

            updatedTaskToSubtask.set(sourceParent, subtasks);
        } else {
            const sourceSubtasks = taskToSubtask.get(sourceParent); 
            const targetSubtasks = taskToSubtask.get(targetParent) || [];
            
            const sourceIndex = sourceSubtasks.findIndex(task => task.id === source);
            let targetIndex = targetSubtasks.findIndex(task => task.id === target);

            if (targetIndex === -1) targetIndex = 0;
            if (droppedOn === DROP_HIGHLIGHT_DRAWERS.BOTTOM) targetIndex++;
            
            const removedTask = sourceSubtasks.splice(sourceIndex, 1)[0];
            
            removedTask.parent_task_id = targetParent;

            targetSubtasks.splice(targetIndex, 0, removedTask);

            for (let i = 0; i < sourceSubtasks.length; ++i) sourceSubtasks[i].order = i;
            for (let i = 0; i < targetSubtasks.length; ++i) targetSubtasks[i].order = i;

            updatedTaskToSubtask.set(sourceParent, sourceSubtasks);
            updatedTaskToSubtask.set(targetParent, targetSubtasks);
        }

        const rearrangedTasksFlat = [];

        updatedTaskToSubtask.forEach(value => rearrangedTasksFlat.push(...value));

        dispatch(dropTask(rearrangedTasksFlat));

        dispatch(bulkUpdateTasksAction(rearrangedTasksFlat));
    }, [taskList, taskToSubtask, subtaskToTask]);

    const handleTaskComplete = (taskID, isCurrentlyComplete) => {
        const rearrangedTasks = reorderTasksOnComplete(taskID, !isCurrentlyComplete);
        dispatch(bulkUpdateTasksAction(rearrangedTasks));
    }

    const handleTaskClick = id => {
        setTaskID(id);
        setShowTaskForm(true);
        setOpenTaskFormInDetailView(true);
    }

    const handleTaskFormClose = () => {
        setTaskID(null);
        setOpenTaskFormInDetailView(false);
        setShowTaskForm(false);
    }

    const handleNavigateToParentTask = taskID => {
        setTaskID(taskID);
    };

    useEffect(() => {
        dispatch(getProjectAction(projectID));
    }, [projectID]);

    return <>
        <TaskEditor 
            projectName={project?.name} 
            tasks={[...(taskTree||[])]}
            showCompletedTasks={showCompletedTasks}
            onTaskDelete={handleTaskDelete} 
            onTaskAddIconClick={handleTaskAddIconClick} 
            onTaskEdit={handleTaskEdit}
            onDrop={handleTaskDrop}
            onTaskComplete={handleTaskComplete}
            onTaskClick={handleTaskClick}
            ProjectMenu={props => <ProjectMenuContainer 
                projectID={projectID} 
                showCompletedTasks={showCompletedTasks}
                onShowCompletedTaskChange={show => setShowCompletedTask(show)}
                {...props} 
            />}
            isDetailView={openTaskFormInDetailView} 
        />
        <Modal isOpen={showTaskForm} onRequestClose={handleTaskFormClose} style={taskFormModalStyle} >
            <TaskFormContainer 
                projectID={project?.id}
                taskID={taskID}
                subtasks={taskID ? taskToSubtask?.get(taskID) : []}
                isDetailView={openTaskFormInDetailView}
                createAtOrder={taskList?.length || 0} 
                onSubmitSuccess={() => { 
                    setShowTaskForm(false); 
                    setTaskID(null); 
                }} 
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
                onDrop={handleTaskDrop}
                onTaskComplete={handleTaskComplete}
                onTaskClick={handleTaskClick}
                onNavigateToParentTask={handleNavigateToParentTask}
            />
        </Modal>
    </>
}

export default TaskEditorContainer;