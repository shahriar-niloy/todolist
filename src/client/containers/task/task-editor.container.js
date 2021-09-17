import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskEditor from '../../components/editor/task-editor.component';
import Modal from '../../components/modal';
import { getProjectAction } from '../../store/actions/project.action';
import { deleteTaskAction } from '../../store/actions/task.action';
import TaskFormContainer from './task-form.container';

function TaskEditorContainer() {
    const dispatch = useDispatch();
    const params = useParams();
    const projectID = params.id;
    const project = useSelector(state => state.project.details);
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

    useEffect(() => {
        dispatch(getProjectAction(projectID));
    }, [projectID]);

    return <>
        <TaskEditor 
            projectName={project?.name} 
            tasks={project?.tasks}
            onTaskDelete={handleTaskDelete} 
            onTaskAddIconClick={handleTaskAddIconClick} 
            onTaskEdit={handleTaskEdit}
        />
        <Modal isOpen={showTaskForm} onRequestClose={() => setShowTaskForm(false)} >
            <TaskFormContainer 
                projectID={project?.id}
                taskID={taskID}
                onSubmitSuccess={() => { 
                    setShowTaskForm(false); 
                    setTaskID(null); 
                }} 
                order={project?.tasks?.length || 0} 
            />
        </Modal>
    </>
}

export default TaskEditorContainer;