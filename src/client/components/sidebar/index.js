import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CalendarTodayIcon from '../ui/icons/calendar-today.icon';
import SidebarItem from './sidebar-item.component';

function Sidebar ({ projects, onProjectAddClick, MenuItemContextMenuTrigger, menuItemContextMenuID, currentPathname }) {
    const isAProjectSelected = projects && projects.some(project => project.path === currentPathname);
    const [isProjectExpanded, setIsProjectExanded]= useState(isAProjectSelected);

    return (
        <div
            className="d-flex flex-column flex-shrink-0 text-white sidebar"
        >
            <div className="mb-3">
                <SidebarItem 
                    path="/today"
                    isSelected={currentPathname === "/today"}
                >
                    <div className="align-y">
                        <CalendarTodayIcon className="me-2" fontSize="14" />
                        <span>Today</span>
                    </div>
                </SidebarItem>
            </div>
            <div className="nav nav-pills flex-column mb-auto expandable_menu_section">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <i class={`fas fa-chevron-right me-1 expand_icon ${isProjectExpanded ? 'rotate_90' : ''}`}></i>
                        <label className="expandable_menu_item" for="expandable_menuitem">Projects</label>
                    </div>
                    <i class="fas fa-plus font-size-12 clickable" onClick={onProjectAddClick} />
                </div>
                <input class="hidden" id="expandable_menuitem" type="checkbox" onClick={() => setIsProjectExanded(!isProjectExpanded)} checked={isProjectExpanded} />
                <div className="expanded_section">
                    {projects &&
                        projects.length &&
                        projects.map((i) => (
                            <SidebarItem 
                                key={i.path} 
                                path={i.path} 
                                name={i.name} 
                                triggerID={i.id}
                                data={i}
                                ContextMenuTrigger={MenuItemContextMenuTrigger}
                                contextID={menuItemContextMenuID}
                                isSelected={currentPathname === i.path}
                            >
                                <span>{i.name}</span>
                                {i.is_shared && <i class="far fa-share-alt ms-2 font-size-12 todolist-secondary-font-color" aria-hidden="true" />}
                            </SidebarItem>
                        ))}
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    projects: PropTypes.array.isRequired,
    onProjectAddClick: PropTypes.func.isRequired,
    MenuItemContextMenuTrigger: PropTypes.func,
    menuItemContextMenuID: PropTypes.string,
    currentPathname: PropTypes.string
}

export default Sidebar;