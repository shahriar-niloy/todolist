import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ path, name, ContextMenuTrigger, contextID, triggerID }) {
    return <div className="menuitem">
        {
            ContextMenuTrigger 
                ? <ContextMenuTrigger id={contextID} triggerID={triggerID} collect={props => ({ triggerID: props.triggerID })} >
                    <Link to={path} aria-current="page">
                        <span>{name}</span>
                    </Link>    
                </ContextMenuTrigger>
                : <Link to={path} aria-current="page">
                    <span>{name}</span>
                </Link>    
        }
    </div>
}

function Sidebar ({ projects, onProjectAddClick, MenuItemContextMenuTrigger, menuItemContextMenuID }) {
    const [isProjectExpanded, setIsProjectExanded]= useState(false);

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white sidebar"
        >
            <div className="nav nav-pills flex-column mb-auto expandable_menu_section">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <i class={`fas fa-chevron-right me-1 expand_icon ${isProjectExpanded ? 'rotate_90' : ''}`}></i>
                        <label className="expandable_menu_item" for="expandable_menuitem">Projects</label>
                    </div>
                    <i class="fas fa-plus font-size-12 clickable" onClick={onProjectAddClick} />
                </div>
                <input class="hidden" id="expandable_menuitem" type="checkbox" onClick={() => setIsProjectExanded(!isProjectExpanded)} />
                <div className="expanded_section">
                    {projects &&
                        projects.length &&
                        projects.map((i) => (
                            <SidebarItem 
                                key={i.path} 
                                path={i.path} 
                                name={i.name} 
                                triggerID={i.id}
                                ContextMenuTrigger={MenuItemContextMenuTrigger}
                                contextID={menuItemContextMenuID}
                            />
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
    menuItemContextMenuID: PropTypes.string
}

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ContextMenuTrigger: PropTypes.func,
    contextMenuID: PropTypes.string,
    triggerID: PropTypes.string
}

export default Sidebar;