import React from 'react';
import PropTypes from 'prop-types';
import { convertTimeToWords } from '../../utility';
import CircleSpinner from '../ui/spinner/circle-spinner.component';

export default function NotificationDropDown({ notifications, rootRef, lastElementRef, isLoading, onMarkAsRead, onNotificationClick }) {
    return <div className='py-2 notification-dropdown'>
        <div className='px-3 fw-bold mb-2 notification-header'>
            <span className='notification-header-title'>Notifications</span>
            {notifications.length > 0 && <span className='notification-header-action' onClick={() => onMarkAsRead(notifications.map(n => n.id))}>Mark as read</span>}
        </div>
        {
            notifications.length > 0 
                ? <div>
                        <ul ref={rootRef} className='notification-list'>
                            {
                                notifications.map((notification, index) => {
                                    if (index+1 === notifications.length) {
                                        return <li key={notification.id} ref={lastElementRef} onClick={() => onNotificationClick(notification)} >
                                            <div className='notification-text'>{notification.message}</div>
                                            <div className='notification-metadata'>{convertTimeToWords(notification.created_at)}</div>
                                        </li>
                                    } else {
                                        return <li key={notification.id} onClick={() => onNotificationClick(notification)} >
                                            <div className='notification-text'>{notification.message}</div>
                                            <div className='notification-metadata'>{convertTimeToWords(notification.created_at)}</div>
                                        </li>
                                    }
                                }) 
                            }
                            {isLoading && <div className='px-3 align-xy my-2 mt-3'><CircleSpinner scale={0.25} /></div>}
                        </ul>
                    </div>
                : <div className='notification-none px-3'>You have no unread notifications.</div>
        }
    </div>
}

NotificationDropDown.defaultValues = {
    notifications: []
};

NotificationDropDown.propTypes = {
    notifications: PropTypes.array.isRequired,
    onMarkAsRead: PropTypes.func.isRequired
};