import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from "react-contextmenu";
import { useLocation } from 'react-router';

import Sidebar from '../components/sidebar';
import contextMenuIDs from '../constants/context-menu.constants';
import ProjectItemContextMenu from './context-menu/project-items.context-menu';

function SidebarContainer({ onProjectAddClick, onProjectEditClick, projects=[] }) {
    const location = useLocation();

    return <>
        <Sidebar 
            projects={projects.map(project => ({ id: project.id, name: project.name, path: `/projects/${project.id}` }))} 
            MenuItemContextMenuTrigger={ContextMenuTrigger}
            menuItemContextMenuID={contextMenuIDs.SIDEBAR_PROJECT_CHILD_CONTEXT_MENU}
            currentPathname={location.pathname}
            onProjectAddClick={onProjectAddClick}
        />
        <ProjectItemContextMenu onProjectEditClick={onProjectEditClick} />
    </>
}

SidebarContainer.propTypes = {
    projects: PropTypes.array,
    onProjectAddClick: PropTypes.func.isRequired,
    onProjectEditClick: PropTypes.func.isRequired
}

export default SidebarContainer;