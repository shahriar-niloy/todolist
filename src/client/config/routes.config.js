import React from 'react';

const routeConfig = [
    { 
        "path": '/',
        "exact": true,
        "component": () => <>Hello, World!</>,
        "isPrivate": true
    },
    { 
        "path": '/api',
        "exact": true,
        "component": () => <>Hello, API!</>
    },
    { 
        "path": '*',
        "exact": true,
        "component": () => <>No Match!</>
    }
]

export default routeConfig;