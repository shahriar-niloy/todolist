import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import PropTypes from 'prop-types';

function AppContextMenu({ onClick, contextID, menuItems, onShow }) {
    return (
        <ContextMenu id={contextID} className="context-menu" onShow={onShow}>
            {menuItems.map(i => (
                <MenuItem
                    key={i.id}
                    attributes={{ className: "context-menu-item" }}
                    data={{ itemID: i.id }}
                    onClick={onClick}
                >
                    {i.name}
                </MenuItem>
            ))}
        </ContextMenu>
    );
}

AppContextMenu.defaultProps = {
    menuItems: [],
    onClick: () => null
}

AppContextMenu.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired,
    contextID: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired
}

export default AppContextMenu;