import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOnNotificationEventHandler, subscribeToNotification } from '../socket/socket.actions';
import { appendNotificatonAction } from '../store/actions/notification.actions';
import useLocalStorage from './useLocalStorage.hook';
import { NOTIFICATION_SEEN_STATUS_LOCALE_STORAGE_KEY } from '../constants/notification.constants';
import { getMyNotificationsAction } from '../store/actions/user.actions';

function useUserNotification() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.profile);
    const recentNotifications = useSelector(state => state.notification.recentNotifications.data);
    const { hasMore } = useSelector(state => state.notification.recentNotifications.metadata);
    const [notificationSeenStatus, setNotificationSeenStatus] = useLocalStorage(NOTIFICATION_SEEN_STATUS_LOCALE_STORAGE_KEY);

    const seenNotifications = notificationSeenStatus[currentUser.id] 
        ? Object.keys(notificationSeenStatus[currentUser.id]) 
        : [];

    const unseenNotificationCount = recentNotifications.filter(n => !seenNotifications.includes(n.id)).length;
    const unseenNotificationCountFormatted = unseenNotificationCount === 0 
        ? ''
        : hasMore 
            ? `${unseenNotificationCount}+` 
            : unseenNotificationCount.toString();

    const handleOnShowNotifications = (notificationIDs) => {
        const updatedNotificationSeenStatus = { ...notificationSeenStatus };

        notificationIDs.forEach(id => {
            updatedNotificationSeenStatus[currentUser.id] = { 
                ...updatedNotificationSeenStatus[currentUser.id], 
                [id]: true
            }
        });

        setNotificationSeenStatus(updatedNotificationSeenStatus);
    };

    useEffect(() => {
        subscribeToNotification();
        dispatch(getMyNotificationsAction());

        const cleanupHandlerFunctions = [
            addOnNotificationEventHandler((data) => dispatch(appendNotificatonAction([data])))
        ];

        return () => {
            cleanupHandlerFunctions.forEach(cleanupFunction => cleanupFunction());
        }
    }, []);

    return {
        recentNotifications,
        unseenNotificationCount: unseenNotificationCountFormatted,
        notificationSeenStatus, 
        setNotificationSeenStatus,
        handleOnShowNotifications
    };        
}

export default useUserNotification;