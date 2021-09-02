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
        "component": () => <>Hello, API!</>
    },
    { 
        "path": '*',
        "component": () => <>No Match!</>
    }
]

export default routeConfig;