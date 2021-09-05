import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routeConfig from '../../config/routes.config';
import PrivateRoute from './privateroute.component';

const Routes = () => {
    return <Switch>
        {routeConfig.map(({ isPrivate, ...rest }, i) => isPrivate ? <PrivateRoute key={i} {...rest} /> : <Route key={i} {...rest} />)}
    </Switch>
}

export default Routes;