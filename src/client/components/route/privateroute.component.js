import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.hook';

const PrivateRoute = (props) => {
    const { isLoggedIn } = useAuth();
    
    return isLoggedIn 
        ? <Route {...props} /> 
        : <Redirect to="/login" />
}

export default PrivateRoute;