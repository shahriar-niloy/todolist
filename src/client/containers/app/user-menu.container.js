import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserMenu from '../../components/app/user-menu.component';
import LogoutIcon from '../../components/ui/icons/logout.icon';
import SettingsIcon from '../../components/ui/icons/settings.icon';
import UserIcon from '../../components/ui/icons/user.icon';
import useAuth from '../../hooks/useAuth.hook';

function UserMenuContainer({ hidePopover }) {
    const history = useHistory();
    const location = useLocation();
    const { logout } = useAuth();

    const handleClickSettings = () => {
        history.push('/settings/account', { previousPath: location.pathname });
        hidePopover();
    };

    const handleLogout = () => {
        logout();
        hidePopover();
        window.location = '/login';
    }

    const menuitems = [
        { label: 'Settings', onClick: handleClickSettings, icon: <SettingsIcon className="me-2" /> },
        { label: 'Logout', onClick: handleLogout, icon: <LogoutIcon className="me-2" /> }
    ];

    return <UserMenu menuitems={menuitems} /> 
}

UserMenuContainer.propTypes = {
    hidePopover: PropTypes.func.isRequired
}

export default UserMenuContainer;