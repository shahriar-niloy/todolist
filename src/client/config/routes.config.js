import React from 'react';
import Login from '../containers/login.component';
import ToDoManager from '../containers/todo-manager.container';

const routeConfig = [
    { 
        "path": '/',
        "exact": true,
        "component": ToDoManager,
        "isPrivate": true
    },
    { 
        "path": '/login',
        "exact": true,
        "component": Login
    },
    { 
        "path": '/api',
        "component": () => <>Hello, API!</>
    },
    { 
        "path": '*',
        "component": () => <>No Match!</>
    }
]

export default routeConfig;