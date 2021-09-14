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
        child: [
            { 
                path: '/projects/:id',
                component: () => <>Hello, API!</>
            },
            {
                path: '',
                component: ToDoManager,
                isPrivate: true
            }
        ]
    }
]

export default routeConfig;