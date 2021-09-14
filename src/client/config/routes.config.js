import React from 'react';
import Login from '../containers/login.component';
import ToDoManager from '../containers/todo-manager.container';

const routeConfig = [
    { 
        path: '/login',
        exact: true,
        component: Login
    },
    { 
        path: '',
        component: ToDoManager
    }
]

export default routeConfig;