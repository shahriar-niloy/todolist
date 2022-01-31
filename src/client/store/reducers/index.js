import { combineReducers } from 'redux'
import userReducer from "./user.reducer";
import projectReducer from "./project.reducer";
import taskReducer from './task.reducer';
import notificationReducer from './notification.reducer';

export default combineReducers({
    user: userReducer,
    project: projectReducer,
    task: taskReducer,
    notification: notificationReducer
});