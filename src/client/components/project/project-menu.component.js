import React from 'react';
import PropTypes from 'prop-types';

function ProjectMenu({ menuitems }) {
    return <div>
        <ul>
            {menuitems.map(menuitem => <li 
                key={menuitem.label} 
                className="align-y"
                onClick={menuitem.onClick} 
            >
                {menuitem.icon}
                {menuitem.label}
            </li>)}
        </ul>
    </div>
}

ProjectMenu.defaultProps = {
    menuitems: []
}

ProjectMenu.propTypes = {
    menuitems: PropTypes.arrayOf(PropTypes.object)
}

export default ProjectMenu;