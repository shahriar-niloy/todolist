import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.hook';

const PrivateRoute = (props) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    return isLoggedIn 
        ? <Route {...props} /> 
        : <Redirect to={{ pathname: "/login", state: { redirectedFromPath: location.pathname + location.search } }} />
}

export default PrivateRoute;