import React from 'react';
import Dashboard from '../components/dashboard';
import Login from '../containers/login.component';

const routeConfig = [
    { 
        "path": '/',
        "exact": true,
        "component": Dashboard,
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