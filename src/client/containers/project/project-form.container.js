import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectForm from '../../components/project/project-form.component';
import { createProjectAction } from '../../store/actions/project.action';

function ProjectFormContainer({ onClose }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.profile);

    const createProject = (values) => {
        values.user_id = currentUser.id; 
        dispatch(createProjectAction(values));
        onClose && onClose();
    };

    return <ProjectForm onSubmit={createProject} />
}

export default ProjectFormContainer;