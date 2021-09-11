import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ path, name }) {
    return <div className="menuitem">
        <Link to={path} aria-current="page">
            <span>{name}</span>
        </Link>
    </div>
}

function Sidebar ({ menuItems }) {
    const [isProjectExpanded, setIsProjectExanded]= useState(false);

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
        >
            <div className="nav nav-pills flex-column mb-auto expandable_menu_section">
                <div className="d-flex align-items-center">
                    <i class={`fas fa-chevron-right me-1 expand_icon ${isProjectExpanded ? 'rotate_90' : ''}`}></i>
                    <label className="expandable_menu_item" for="expandable_menuitem">Projects</label>
                </div>
                <input class="hidden" id="expandable_menuitem" type="checkbox" onClick={() => setIsProjectExanded(!isProjectExpanded)} />
                <div className="expanded_section">
                    {menuItems &&
                        menuItems.length &&
                        menuItems.map((i) => (
                            <SidebarItem key={i.path} path={i.path} name={i.name} />
                        ))}
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    menuItems: PropTypes.array.isRequired
}

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Sidebar;