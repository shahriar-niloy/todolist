import React from 'react';
import { useLocation } from 'react-router';
import SettingSidebar from '../../../components/app/settings/settings-sidebar.component';

function SettingSidebarContainer() {
    const location = useLocation();

    const settingsItems = [
        {
            id: 'account', 
            name: 'Account', 
            path: `/settings/account`,
            icon: () => <i className="far fa-user me-2" />,
            isPartialRoute: true
        },
        {
            id: 'theme', 
            name: 'Theme', 
            path: `/settings/theme`,
            icon: () => <i class="fal fa-palette me-2"></i>
        }
    ];

    return <>
        <SettingSidebar 
            items={settingsItems} 
            currentPathname={location.pathname}
        />
    </>
}

export default SettingSidebarContainer;