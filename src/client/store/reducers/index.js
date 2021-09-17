import { combineReducers } from 'redux'
import userReducer from "./user.reducer";
import projectReducer from "./project.reducer";
import taskReducer from './task.reducer';

export default combineReducers({
    user: userReducer,
    project: projectReducer,
    task: taskReducer
});