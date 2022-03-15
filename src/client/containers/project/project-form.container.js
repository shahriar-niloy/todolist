import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectForm from '../../components/project/project-form.component';
import { createProjectAction, updateProjectAction } from '../../store/actions/project.action';
import { getProjectAction } from '../../store/actions/project.action';
import { getIconsAction } from '../../store/actions/icon.actions';
import { ProjectSchema } from '../../../common';
import { showToast } from '../../components/toast/toast.component';
import ToastTypes from '../../constants/toast.types';

function ProjectFormContainer({ onClose, projectID }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.profile);
    const project = useSelector(state => state.project.details);
    const icons = useSelector(state => state.icon.list);

    const createProject = (values) => {
        values.user_id = currentUser.id; 
        dispatch(
            createProjectAction(
                values,
                () => onClose && onClose(),
                errors => showToast(ToastTypes.ERROR, errors.map(error => error.message))
            )
        );
    };

    const updateProject = (values) => {
        dispatch(
            updateProjectAction(
                projectID, 
                values,
                () => onClose && onClose(),
                errors => showToast(ToastTypes.ERROR, errors.map(error => error.message))
            )
        );
    };

    useEffect(() => {
        if (projectID) {
            dispatch(getProjectAction(projectID));
        }
    }, [projectID]);

    useEffect(() => dispatch(getIconsAction()), []);

    return <ProjectForm
        icons={icons.data}
        schema={ProjectSchema.ProjectFormSchema}
        initialValues={projectID && project ? 
            { 
                name: project.name,
                icon_id: project.icon?.id || ''
            } : 
            { 
                name: '',
                icon_id: ''
            }
        }
        isEditing={!!projectID}
        onSubmit={projectID ? updateProject : createProject} 
    />;
}

ProjectFormContainer.propTypes = {
    onClose: PropTypes.func,
    projectID: PropTypes.string
}

export default ProjectFormContainer;