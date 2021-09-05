import React from 'react';
import Login from '../container/login.component';

const routeConfig = [
    { 
        "path": '/',
        "exact": true,
        "component": () => <>Hello, World!</>,
        "isPrivate": true
    },
    { 
        "path": '/login',
        "exact": true,
        "component": Login,
        "isPrivate": true
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