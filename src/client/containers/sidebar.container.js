import React from 'react';
import Sidebar from '../components/sidebar';

function SidebarContainer() {
    return <Sidebar 
        menuItems={[{ name: 'Home', path: '/api' }]} 
        onProjectAddClick={() => console.log('Clicked Project Add')}
    />
}

export default SidebarContainer;