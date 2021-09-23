import React, { useCallback, useEffect, useState } from 'react';
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
    const taskList = useSelector(state => state.task.list);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskID, setTaskID] = useState(null);

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
        const rearrangedTasks = [...taskList];

        const sourceIndex = rearrangedTasks.findIndex(task => task.id === source);
        const targetIndex = rearrangedTasks.findIndex(task => task.id === target);
        
        rearrangedTasks.splice(targetIndex, 0, rearrangedTasks.splice(sourceIndex, 1)[0]);

        dispatch(dropTask(rearrangedTasks));

        const requestBody = rearrangedTasks.map((task, index) => { task.order = index; return task; });

        dispatch(bulkUpdateTasksAction(requestBody));
    }, [taskList]);

    const handleTaskComplete = (taskID, isCurrentlyComplete) => {
        dispatch(updateTaskAction(taskID, { is_completed: !isCurrentlyComplete }));
    }

    useEffect(() => {
        dispatch(getProjectAction(projectID));
    }, [projectID]);

    return <>
        <TaskEditor 
            projectName={project?.name} 
            tasks={taskList}
            onTaskDelete={handleTaskDelete} 
            onTaskAddIconClick={handleTaskAddIconClick} 
            onTaskEdit={handleTaskEdit}
            onDrop={handleTaskDrop}
            onTaskComplete={handleTaskComplete}
            ProjectMenu={props => <ProjectMenuContainer {...props} projectID={projectID} />}
        />
        <Modal isOpen={showTaskForm} onRequestClose={() => setShowTaskForm(false)} >
            <TaskFormContainer 
                projectID={project?.id}
                taskID={taskID}
                onSubmitSuccess={() => { 
                    setShowTaskForm(false); 
                    setTaskID(null); 
                }} 
                order={taskList?.length || 0} 
            />
        </Modal>
    </>
}

export default TaskEditorContainer;