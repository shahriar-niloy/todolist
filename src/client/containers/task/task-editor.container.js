import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskEditor from '../../components/editor/task-editor.component';
import Modal from '../../components/modal';
import { getProjectAction } from '../../store/actions/project.action';
import { bulkUpdateTasksAction, deleteTaskAction, dropTask, updateTaskAction } from '../../store/actions/task.action';
import ProjectMenuContainer from '../project/project-menu.container';
import TaskFormContainer from './task-form.container';

function TaskEditorContainer() {
    const dispatch = useDispatch();
    const params = useParams();
    const projectID = params.id;
    const project = useSelector(state => state.project.details);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskID, setTaskID] = useState(null);
    const [showCompletedTasks, setShowCompletedTask] = useState(false);
    const { 
        flat: taskList, 
        tree: taskTree, 
        taskToSubtask, 
        subtaskToTask
    } = useSelector(state => state.task.list);

    const reorderTasksOnComplete = (taskID, isCompleted) => {
        const latestTaskList = [...taskList];
        
        const taskIndex = latestTaskList.findIndex(task => task.id === taskID);
        latestTaskList[taskIndex].is_completed =  isCompleted;

        const rearrangedTasks = [...latestTaskList.filter(task => !task.is_completed), ...latestTaskList.filter(task => task.is_completed)];

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

    const handleTaskDrop = useCallback((source, target) => {        
        const updatedTaskToSubtask = new Map(taskToSubtask);

        const sourceParent = subtaskToTask.get(source);
        const targetParent = subtaskToTask.get(target);

        if (sourceParent === targetParent) {
            const subtasks = taskToSubtask.get(sourceParent);
            
            const sourceIndex = subtasks.findIndex(task => task.id === source);
            const targetIndex = subtasks.findIndex(task => task.id === target);

            subtasks.splice(targetIndex, 0, subtasks.splice(sourceIndex, 1)[0]);

            for (let i = 0; i < subtasks.length; ++i) subtasks[i].order = i;

            updatedTaskToSubtask.set(sourceParent, subtasks);
        } else {
            const sourceSubtasks = taskToSubtask.get(sourceParent); 
            const targetSubtasks = taskToSubtask.get(targetParent);
            
            const sourceIndex = sourceSubtasks.findIndex(task => task.id === source);
            const targetIndex = targetSubtasks.findIndex(task => task.id === target);
            
            const removedTask = sourceSubtasks.splice(sourceIndex, 1)[0];
            
            removedTask.parent_task_id = targetParent;

            targetSubtasks.splice(targetIndex, 0, removedTask);

            for (let i = 0; i < sourceSubtasks.length; ++i) sourceSubtasks[i].order = i;
            for (let i = 0; i < targetSubtasks.length; ++i) targetSubtasks[i].order = i;

            updatedTaskToSubtask.set(source, sourceSubtasks);
            updatedTaskToSubtask.set(target, targetSubtasks);
        }

        const rearrangedTasksFlat = [];

        updatedTaskToSubtask.forEach(value => rearrangedTasksFlat.push(...value));

        dispatch(dropTask(rearrangedTasksFlat));

        dispatch(bulkUpdateTasksAction(rearrangedTasksFlat));
    }, [taskList]);

    const handleTaskComplete = (taskID, isCurrentlyComplete) => {
        const rearrangedTasks = reorderTasksOnComplete(taskID, !isCurrentlyComplete);
        dispatch(bulkUpdateTasksAction(rearrangedTasks));
    }

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
            ProjectMenu={props => <ProjectMenuContainer 
                projectID={projectID} 
                showCompletedTasks={showCompletedTasks}
                onShowCompletedTaskChange={show => setShowCompletedTask(show)}
                {...props} 
            />}
        />
        <Modal isOpen={showTaskForm} onRequestClose={() => setShowTaskForm(false)} >
            <TaskFormContainer 
                projectID={project?.id}
                taskID={taskID}
                onSubmitSuccess={() => { 
                    setShowTaskForm(false); 
                    setTaskID(null); 
                }} 
                createAtOrder={taskList?.length || 0} 
            />
        </Modal>
    </>
}

export default TaskEditorContainer;