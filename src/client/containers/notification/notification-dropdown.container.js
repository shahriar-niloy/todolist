import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotificationDropDown from '../../components/app/notification-drop-down.component';
import { getMyNotificationsAction, markMyNotificationsAsReadAction } from '../../store/actions/user.actions';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.hook';
import { Types } from '../../constants/notification.constants';

function NotificationDropDownContainer({ hidePopover }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const rootRef = useRef();
    const recentNotifications = useSelector(state => state.notification.recentNotifications.data);
    const recentNotificationsMetadata = useSelector(state => state.notification.recentNotifications.metadata);
    const isNotificationLoading = useSelector(state => state.notification.recentNotifications.isPending);
    
    const { lastElementRef } = useInfiniteScroll(
        () => {
            const { page, hasMore } = recentNotificationsMetadata;
            if (hasMore) dispatch(getMyNotificationsAction(page + 1, true));
        }, 
        isNotificationLoading, 
        rootRef
    );

    const handleMarkAsRead = (notificationIDs) => {
        dispatch(markMyNotificationsAsReadAction(notificationIDs));
    };

    const handleNotificationClick = notification => {
        const projectID = notification.data.projectID;

        if (notification.type === Types.PROJECT_SHARED) {
            history.push('/projects/' + projectID);
        }

        if (notification.type === Types.TASK_COMPLETED) {
            history.push('/projects/' + projectID);
        }

        hidePopover();
    }

    return <NotificationDropDown 
        lastElementRef={lastElementRef}
        isLoading={isNotificationLoading}
        rootRef={rootRef}
        notifications={recentNotifications}
        onMarkAsRead={handleMarkAsRead} 
        onNotificationClick={handleNotificationClick}
    />
}

NotificationDropDownContainer.propTypes = {
    onNotificationClick: PropTypes.func.isRequired
}

export default NotificationDropDownContainer;