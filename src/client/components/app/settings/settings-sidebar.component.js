import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SidebarItem({ path, name, ContextMenuTrigger, contextID, triggerID, isSelected=false, children, data }) {
    return <div className={`menuitem ${isSelected ? 'menuitem-selected' : ''}`}>
        {
            ContextMenuTrigger 
                ? <ContextMenuTrigger id={contextID} triggerID={triggerID} collect={props => ({ triggerID: props.triggerID, triggerData: data })} >
                    <Link to={path} aria-current="page">
                        {children ? children : <span>{name}</span>}
                    </Link>    
                </ContextMenuTrigger>
                : <Link to={path} aria-current="page">
                    {children ? children : <span>{name}</span>}
                </Link>    
        }
    </div>
}

function SettingSidebar ({ items, MenuItemContextMenuTrigger, menuItemContextMenuID, currentPathname }) {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 setting-sidebar"
        >
            <div className='fw-bold font-size-19 mb-4'>Settings</div>
            <div className="nav nav-pills flex-column mb-auto expandable_menu_section">
                <div className="expanded_section">
                    {items &&
                        items.length &&
                        items.map((i) => (
                            <SidebarItem 
                                key={i.path} 
                                path={i.path} 
                                name={i.name} 
                                triggerID={i.id}
                                data={i}
                                ContextMenuTrigger={MenuItemContextMenuTrigger}
                                contextID={menuItemContextMenuID}
                                isSelected={i.isPartialRoute 
                                    ? currentPathname.indexOf(i.path) === 0
                                    : currentPathname === i.path
                                }
                            >
                                <div>
                                    {i.icon && i.icon()}
                                    <span>{i.name}</span>
                                </div>
                            </SidebarItem>
                        ))}
                </div>
            </div>
        </div>
    );
}

SettingSidebar.defaultProps = {
    items: []
};

SettingSidebar.propTypes = {
    items: PropTypes.array,
    MenuItemContextMenuTrigger: PropTypes.func,
    menuItemContextMenuID: PropTypes.string,
    currentPathname: PropTypes.string
}

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ContextMenuTrigger: PropTypes.func,
    contextMenuID: PropTypes.string,
    triggerID: PropTypes.string,
    data: PropTypes.object
}

export default SettingSidebar;