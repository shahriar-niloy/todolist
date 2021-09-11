import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/sidebar';

function SidebarContainer({ onProjectAddClick }) {
    return <Sidebar 
        menuItems={[{ name: 'Home', path: '/api' }]} 
        onProjectAddClick={onProjectAddClick}
    />
}

SidebarContainer.propTypes = {
    onProjectAddClick: PropTypes.func.isRequired
}

export default SidebarContainer;