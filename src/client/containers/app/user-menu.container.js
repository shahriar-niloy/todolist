import React from 'react';
import UserMenu from '../../components/app/user-menu.component';
import LogoutIcon from '../../components/ui/icons/logout.icon';
import SettingsIcon from '../../components/ui/icons/settings.icon';
import UserIcon from '../../components/ui/icons/user.icon';

function UserMenuContainer() {
    const menuitems = [
        { label: 'Profile', onClick: () => console.log('User'), icon: <UserIcon className="me-2" /> },
        { label: 'Settings', onClick: () => console.log('Settings'), icon: <SettingsIcon className="me-2" /> },
        { label: 'Logout', onClick: () => console.log('Logout'), icon: <LogoutIcon className="me-2" /> }
    ];

    return <UserMenu menuitems={menuitems} />
}

export default UserMenuContainer;