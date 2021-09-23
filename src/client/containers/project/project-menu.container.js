import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ProjectMenu from '../../components/project/project-menu.component';
import ArchiveIcon from '../../components/ui/icons/archive.icon';
import CheckCircleIcon from '../../components/ui/icons/check-circle.icon';
import TrashIcon from '../../components/ui/icons/trash.icon';
import { deleteProjectAction } from '../../store/actions/project.action';

function ProjectMenuContainer({ projectID, hidePopover }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteProject = () => {
        if (confirm('Are you sure you want to delete this project?')) {
            dispatch(deleteProjectAction(projectID));
            hidePopover();
            history.push('');
        };
    };

    const menuitems = [
        { label: 'Show completed tasks', onClick: () => console.log('SHow tasks completed'), icon: <CheckCircleIcon className="me-2" /> },
        { label: 'Archive project', onClick: () => console.log('Archive'), icon: <ArchiveIcon className="me-2" /> },
        { label: 'Delete project', onClick: handleDeleteProject, icon: <TrashIcon className="me-2" /> }
    ];

    return <ProjectMenu menuitems={menuitems} />
}

ProjectMenuContainer.propTypes = {
    projectID: PropTypes.string.isRequired,
    hidePopover: PropTypes.func.isRequired
}

export default ProjectMenuContainer;