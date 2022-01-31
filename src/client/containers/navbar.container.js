import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar';
import useUserNotification from '../hooks/useUserNotification.hook';
import { getInitials } from '../utility';

function NavbarContainer() {
    const currentUser = useSelector(state => state.user.profile);
    const { recentNotifications, unseenNotificationCount, handleOnShowNotifications } = useUserNotification();

    const initials = getInitials(currentUser 
        ? `${currentUser?.first_name} ${currentUser?.last_name}` 
        : ''
    );

    return <Navbar 
        unseenNotificationCount={unseenNotificationCount}
        notifications={recentNotifications} 
        initials={initials} 
        onShowNotifications={handleOnShowNotifications}
    />
}

export default NavbarContainer;