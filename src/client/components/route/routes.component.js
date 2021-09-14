import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routeConfig from '../../config/routes.config';
import PrivateRoute from './privateroute.component';

const NoMatch = () => <div>No Match</div>;

function buildRoutesComponent(routes, parentPath='') {
    const routeComponents = [];

    routes.forEach((route, ind) => {
        const { isPrivate, child, path, ...rest } = route; 
        
        const routePath = parentPath + path;

        if (child) {
            routeComponents.push(
                <Route key={ind} path={routePath}>
                    {buildRoutesComponent(child, routePath)}
                </Route>
            );
        }
        else if (isPrivate) routeComponents.push(<PrivateRoute key={ind} path={routePath} {...rest} />);
        else routeComponents.push(<Route key={ind} path={routePath} {...rest} />);
    });

    return <Switch>
        {routeComponents}
        <Route path="*" component={NoMatch} />
    </Switch>;
}

const Routes = () => {
    return <Switch>
        {buildRoutesComponent(routeConfig)}
    </Switch>
}

export default Routes;