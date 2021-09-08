import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
function SidebarItem({ path, name }) {
    return <div className="menuitem">
        <Link to={path} aria-current="page">
            <span>{name}</span>
        </Link>
    </div>
}

function Sidebar ({ menuItems }) {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
        >
            <div className="nav nav-pills flex-column mb-auto expandable_menu_section">
                <label className="expandable_menu_item" for="expandable_menuitem">Projects</label>
                <input class="hidden" id="expandable_menuitem" type="checkbox" />
                <div className="expanded_section">
                    {menuItems &&
                        menuItems.length &&
                        menuItems.map((i) => (
                            <SidebarItem path={i.path} name={i.name} />
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