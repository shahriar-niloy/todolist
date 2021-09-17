import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskEditor from '../../components/editor/task-editor.component';
import Modal from '../../components/modal';
import { getProjectAction } from '../../store/actions/project.action';
import TaskFormContainer from './task-form.container';

function TaskEditorContainer() {
    const dispatch = useDispatch();
    const params = useParams();
    const projectID = params.id;
    const project = useSelector(state => state.project.details);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const handleTaskAddIconClick = () => {
        setShowTaskForm(true);
    }

    useEffect(() => {
        dispatch(getProjectAction(projectID));
    }, [projectID]);

    return <>
        <TaskEditor 
            projectName={project?.name} 
            tasks={project?.tasks} 
            onTaskAddIconClick={handleTaskAddIconClick} 
        />
        <Modal isOpen={showTaskForm} onRequestClose={() => setShowTaskForm(false)} >
            <TaskFormContainer 
                onSubmitSuccess={() => setShowTaskForm(false)} order={project?.tasks?.length || 0} 
                projectID={project?.id}
            />
        </Modal>
    </>
}

export default TaskEditorContainer;