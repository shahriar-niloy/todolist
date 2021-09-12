import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/sidebar';

function SidebarContainer({ onProjectAddClick, projects=[] }) {
    return <Sidebar 
        projects={projects.map(project => ({ name: project.name, path: `/projects/${project.id}` }))} 
        onProjectAddClick={onProjectAddClick}
    />
}

SidebarContainer.propTypes = {
    onProjectAddClick: PropTypes.func.isRequired,
    projects: PropTypes.array
}

export default SidebarContainer;