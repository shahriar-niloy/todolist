import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from "react-contextmenu";

import Sidebar from '../components/sidebar';
import contextMenuIDs from '../constants/context-menu.constants';
import ProjectItemContextMenu from './context-menu/project-items.context-menu';

function SidebarContainer({ onProjectAddClick, projects=[] }) {
    return <>
        <Sidebar 
            projects={projects.map(project => ({ id: project.id, name: project.name, path: `/projects/${project.id}` }))} 
            onProjectAddClick={onProjectAddClick}
            MenuItemContextMenuTrigger={ContextMenuTrigger}
            menuItemContextMenuID={contextMenuIDs.SIDEBAR_PROJECT_CHILD_CONTEXT_MENU}
        />
        <ProjectItemContextMenu />
    </>
}

SidebarContainer.propTypes = {
    onProjectAddClick: PropTypes.func.isRequired,
    projects: PropTypes.array
}

export default SidebarContainer;