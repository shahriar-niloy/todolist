import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import AppContextMenu from '../../components/context-menu';
import contextMenuConstants from '../../constants/context-menu.constants';
import { deleteProjectAction } from '../../store/actions/project.action';

function ProjectItemContextMenu({ onProjectEditClick, onProjectShareClick, onProjectOpenClick }) {
    const defaultMenuItems = [
        { id: 'open', name: 'Open' },
        { id: 'edit', name: 'Edit' },
        { id: 'share', name: 'Share' },
        { id: 'delete', name: 'Delete' }
    ];

    const dispatch = useDispatch();
    const [menuItems, setMenuItems] = useState(defaultMenuItems);

    const menuItemsAvailableForDisplay = menuItems.filter(mi => !mi.hidden);

    const removeMenuItems = (menuItems, itemsToRemove) => menuItems.filter(i => !itemsToRemove.includes(i.id));

    const handleOnMenuShow = e =>{
        const isProjectShared = e.detail.data.triggerData.is_shared;
        const hasWriteAccess = e.detail.data.triggerData.can_write;
        let updatedMenuItems = defaultMenuItems;

        if (isProjectShared) {
            updatedMenuItems = removeMenuItems(updatedMenuItems, ['share', 'delete', 'archive']);
        }

        if (!hasWriteAccess) {
            updatedMenuItems = removeMenuItems(updatedMenuItems, ['edit']);
        }

        setMenuItems(updatedMenuItems);
    };

    const handleMenuItemClick = (e, data) => {
        const { itemID, triggerID } = data;

        if (itemID === 'open') {
            onProjectOpenClick(triggerID);
        }

        if (itemID === 'edit') {
            onProjectEditClick(triggerID);
        }

        if (itemID === 'share') {
            onProjectShareClick(triggerID);
        }

        if (itemID === 'delete') {
            const response = confirm('Are you sure you want to delete this project?');
            if (response) dispatch(deleteProjectAction(triggerID));
        }

    };

    return <AppContextMenu 
        contextID={contextMenuConstants.SIDEBAR_PROJECT_CHILD_CONTEXT_MENU}
        menuItems={menuItemsAvailableForDisplay} 
        onClick={handleMenuItemClick}
        onShow={handleOnMenuShow}
    />
}

ProjectItemContextMenu.propTypes = {
    onProjectEditClick: PropTypes.func.isRequired,
    onProjectShareClick: PropTypes.func.isRequired,
    onProjectOpenClick: PropTypes.func.isRequired
}

export default ProjectItemContextMenu;