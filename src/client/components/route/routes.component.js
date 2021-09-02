import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routeConfig from '../../config/routes.config';
import PrivateRoute from './privateroute.component';

const Routes = () => {
    return <Switch>
        {routeConfig.map(({ isPrivate, ...rest }) => isPrivate ? <PrivateRoute {...rest} /> : <Route {...rest} />)}
    </Switch>
}

export default Routes;