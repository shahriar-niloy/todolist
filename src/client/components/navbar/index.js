import React, { useState } from 'react';
import UserMenuContainer from '../../containers/app/user-menu.container';
import NotificationDropDownContainer from '../../containers/notification/notification-dropdown.container';
import Popover from '../lib/popover';
import NotificationIcon from '../ui/icons/notification.icon';

export default function Navbar({ unseenNotificationCount, initials, notifications=[], onShowNotifications }) {    
    const [isNotificationDropDownOpen, setIsNotificationDropdownOpen] = useState(false);
    
    const handleShowNotifications = () => {
        onShowNotifications(notifications.map(n => n.id));
    };

    return (
        <nav class="navbar navbar-expand-lg dashboard_navbar">
            <div class="container-fluid">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="#">
                        ToDoList
                    </a>
                    <form class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn navbar-search-button" type="submit">
                            Search
                        </button>
                    </form>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-2">
                            <Popover 
                                isOpen={isNotificationDropDownOpen}
                                component={NotificationDropDownContainer}
                                onShow={handleShowNotifications}
                            >
                                <a
                                    className="nav-link active align-xy notification-indicator"
                                    aria-current="page"
                                    href="#"
                                >
                                    <NotificationIcon fontSize={20} />
                                    {
                                        unseenNotificationCount && <div className='notification-indicator-badge'>
                                            {unseenNotificationCount}
                                        </div>
                                    }
                                </a>
                            </Popover>
                        </li>
                        <li className="nav-item">
                            <Popover component={UserMenuContainer} >
                                <a
                                    className="nav-link active initials align-xy"
                                    aria-current="page"
                                    href="#"
                                >
                                    {initials}
                                </a>
                            </Popover>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

