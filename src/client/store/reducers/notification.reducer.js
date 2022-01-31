import _ from 'lodash';
import actions from "../../constants/action.types";
import { getNotificationText } from '../../services/notification.service';

const attachNotificationProperties = notifications => {
    return (notifications || [])
        .map(notification => {
            notification.message = getNotificationText(notification.type, notification.data);
            return notification;
        });
}

const initialState = {
    recentNotifications: {
        data: [],
        metadata: {}
    }
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case actions.APPEND_NOTIFICATIONS:
            const updatedNotifications = attachNotificationProperties(action.payload.notifications).concat(state.recentNotifications.data);
            const distinctNotifications = _.uniqBy(updatedNotifications, 'id');
            return { 
                ...state, 
                recentNotifications: {
                    data: distinctNotifications,
                    metadata: {
                        ...state.recentNotifications.metadata,
                        total: state.recentNotifications.metadata.total + 1
                    },
                    isPending: false
                } 
            };
        case actions.GET_MY_NOTIFICATIONS_PENDING: 
            return {
                ...state,
                recentNotifications: {
                    ...state.recentNotifications,
                    isPending: true
                }
            };
        case actions.GET_MY_NOTIFICATIONS_SUCCESS:
            return { 
                ...state, 
                recentNotifications: {
                    data: action.payload.shouldAppend 
                        ? [...state.recentNotifications.data, ...attachNotificationProperties(action.payload.notifications.data)]
                        : attachNotificationProperties(action.payload.notifications.data),
                    metadata: action.payload.notifications.metadata,
                    isPending: false
                }
            };
        default:
            break;
    }
    return state; 
}