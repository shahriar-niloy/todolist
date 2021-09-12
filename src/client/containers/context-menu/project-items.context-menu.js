import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import AppContextMenu from '../../components/context-menu';
import contextMenuConstants from '../../constants/context-menu.constants';
import { deleteProjectAction } from '../../store/actions/project.action';

function ProjectItemContextMenu({ onProjectEditClick }) {
    const dispatch = useDispatch();

    const menuItems = [
        { id: 'edit', name: 'Edit Project' },
        { id: 'delete', name: 'Delete Project' },
        { id: 'archive', name: 'Archive Project' },
    ];

    const handleMenuItemClick = (e, data) => {
        const { itemID, triggerID } = data;

        if (itemID === 'edit') {
            onProjectEditClick(triggerID);
        }

        if (itemID === 'delete') {
            const response = confirm('Are you sure you want to delete this project?');
            if (response) dispatch(deleteProjectAction(triggerID));
        }

    };

    return <AppContextMenu 
        contextID={contextMenuConstants.SIDEBAR_PROJECT_CHILD_CONTEXT_MENU}
        menuItems={menuItems} 
        onClick={handleMenuItemClick}
    />
}

ProjectItemContextMenu.propTypes = {
    onProjectEditClick: PropTypes.func.isRequired
}

export default ProjectItemContextMenu;