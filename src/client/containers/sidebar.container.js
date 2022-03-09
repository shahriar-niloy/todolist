import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from "react-contextmenu";
import { useLocation } from 'react-router';

import Sidebar from '../components/sidebar';
import contextMenuIDs from '../constants/context-menu.constants';
import ProjectItemContextMenu from './context-menu/project-items.context-menu';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayTasksCountAction } from '../store/actions/task.action';

function SidebarContainer({ projects=[], onProjectAddClick, onProjectEditClick, onProjectShareClick, onProjectOpenClick }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const todayTasksCount = (useSelector(state => state.task.todayTaskCount) || [])
        .filter(item => !item.is_completed);

    useEffect(() => {
        dispatch(getTodayTasksCountAction());
    }, []);

    return <>
        <Sidebar 
            projects={projects.map(project => ({ 
                id: project.id, 
                name: project.name, 
                is_shared: project.is_shared, 
                path: `/projects/${project.id}`,
                can_write: project.can_write,
                can_read: project.can_read,
                icon: project.icon
            }))}
            todayTasksCount={+todayTasksCount[0]?.count} 
            MenuItemContextMenuTrigger={ContextMenuTrigger}
            menuItemContextMenuID={contextMenuIDs.SIDEBAR_PROJECT_CHILD_CONTEXT_MENU}
            currentPathname={location.pathname}
            onProjectAddClick={onProjectAddClick}
        />
        <ProjectItemContextMenu 
            onProjectEditClick={onProjectEditClick} 
            onProjectShareClick={onProjectShareClick}
            onProjectOpenClick={onProjectOpenClick}
        />
    </>
}

SidebarContainer.propTypes = {
    projects: PropTypes.array,
    onProjectAddClick: PropTypes.func.isRequired,
    onProjectEditClick: PropTypes.func.isRequired
}

export default SidebarContainer;