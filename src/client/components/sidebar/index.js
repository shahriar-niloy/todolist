import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ path, name }) {
    return <li class="nav-item">
        <Link to={path} class="nav-link active" aria-current="page">
            {name}
        </Link>
    </li>
}

function Sidebar ({ menuItems }) {
    return (
        <div
            class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style={{ "width": "280px", "height": "100%" }}
        >   
            <ul class="nav nav-pills flex-column mb-auto">
                {
                    menuItems && 
                    menuItems.length && 
                    menuItems.map(i => <SidebarItem path={i.path} name={i.name} />)
                }
            </ul>
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