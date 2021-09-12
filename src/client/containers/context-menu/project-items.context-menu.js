import React from 'react';
import AppContextMenu from '../../components/context-menu';
import contextMenuConstants from '../../constants/context-menu.constants';

function ProjectItemContextMenu() {
    const menuItems = [
        { id: 'edit', name: 'Edit Project' },
        { id: 'delete', name: 'Delete Project' },
        { id: 'archive', name: 'Archive Project' },
    ];

    return <AppContextMenu 
        contextID={contextMenuConstants.SIDEBAR_PROJECT_CHILD_CONTEXT_MENU}
        menuItems={menuItems} 
        onClick={(e, data) => console.log(e, data)}
    />
}

export default ProjectItemContextMenu;