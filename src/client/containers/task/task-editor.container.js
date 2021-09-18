import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskEditor from '../../components/editor/task-editor.component';
import Modal from '../../components/modal';
import { getProjectAction } from '../../store/actions/project.action';
import { deleteTaskAction, dropTask } from '../../store/actions/task.action';
import TaskFormContainer from './task-form.container';

function TaskEditorContainer() {
    const dispatch = useDispatch();
    const params = useParams();
    const projectID = params.id;
    const project = useSelector(state => state.project.details);
    const tasks = useSelector(state => state.task.list);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskID, setTaskID] = useState(null);

    const handleTaskAddIconClick = () => {
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

    const handleTaskDrop = (source, target) => {
        dispatch(dropTask(source, target));
    }

    useEffect(() => {
        dispatch(getProjectAction(projectID));
    }, [projectID]);

    return <>
        <TaskEditor 
            projectName={project?.name} 
            tasks={tasks}
            onTaskDelete={handleTaskDelete} 
            onTaskAddIconClick={handleTaskAddIconClick} 
            onTaskEdit={handleTaskEdit}
            onDrop={handleTaskDrop}
        />
        <Modal isOpen={showTaskForm} onRequestClose={() => setShowTaskForm(false)} >
            <TaskFormContainer 
                projectID={project?.id}
                taskID={taskID}
                onSubmitSuccess={() => { 
                    setShowTaskForm(false); 
                    setTaskID(null); 
                }} 
                order={tasks?.length || 0} 
            />
        </Modal>
    </>
}

export default TaskEditorContainer;