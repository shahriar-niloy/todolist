import React, { useState } from 'react';
import UserMenu from '../../components/app/user-menu.component';
import LogoutIcon from '../../components/ui/icons/logout.icon';
import SettingsIcon from '../../components/ui/icons/settings.icon';
import UserIcon from '../../components/ui/icons/user.icon';
import useAuth from '../../hooks/useAuth.hook';
import PropTypes from 'prop-types';

function UserMenuContainer({ hidePopover }) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        hidePopover();
        window.location = '/login';
    }

    const menuitems = [
        { label: 'Profile', onClick: () => console.log('User'), icon: <UserIcon className="me-2" /> },
        { label: 'Settings', onClick: () => console.log('Settings'), icon: <SettingsIcon className="me-2" /> },
        { label: 'Logout', onClick: handleLogout, icon: <LogoutIcon className="me-2" /> }
    ];

    return <UserMenu menuitems={menuitems} />
}

UserMenuContainer.propTypes = {
    hidePopover: PropTypes.func.isRequired
}

export default UserMenuContainer;