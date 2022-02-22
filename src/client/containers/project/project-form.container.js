import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectForm from '../../components/project/project-form.component';
import { createProjectAction, updateProjectAction } from '../../store/actions/project.action';
import { getProjectAction } from '../../store/actions/project.action';
import { ProjectSchema } from '../../../common';

function ProjectFormContainer({ onClose, projectID }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.profile);
    const project = useSelector(state => state.project.details);

    const createProject = (values) => {
        values.user_id = currentUser.id; 
        dispatch(createProjectAction(values));
        onClose && onClose();
    };

    const updateProject = (values) => {
        dispatch(updateProjectAction(projectID, values));
        onClose && onClose();
    };

    useEffect(() => {
        if (projectID) {
            dispatch(getProjectAction(projectID));
        }
    }, [projectID]);

    return <ProjectForm 
        schema={ProjectSchema.ProjectFormSchema}
        initialValues={projectID && project ? { name: project?.name } : { name: '' }}
        isEditing={!!projectID}
        onSubmit={projectID ? updateProject : createProject} 
    />;
}

ProjectFormContainer.propTypes = {
    onClose: PropTypes.func,
    projectID: PropTypes.string
}

export default ProjectFormContainer;