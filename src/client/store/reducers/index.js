import { combineReducers } from 'redux'
import userReducer from "./user.reducer";
import projectReducer from "./project.reducer";

export default combineReducers({
    user: userReducer,
    project: projectReducer
});