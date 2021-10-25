import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function SidebarItem({ path, name, ContextMenuTrigger, contextID, triggerID, isSelected=false, children }) {
    return <div className={`menuitem ${isSelected ? 'menuitem-selected' : ''}`}>
        {
            ContextMenuTrigger 
                ? <ContextMenuTrigger id={contextID} triggerID={triggerID} collect={props => ({ triggerID: props.triggerID })} >
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

SidebarItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ContextMenuTrigger: PropTypes.func,
    contextMenuID: PropTypes.string,
    triggerID: PropTypes.string
}

export default SidebarItem;