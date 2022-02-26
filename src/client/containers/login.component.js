import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import LoginForm from '../components/app/login-form.component';
import useAuth from '../hooks/useAuth.hook';
import { AppSchema } from '../../common';

export default function Login() {
    const { isLoggedIn, login } = useAuth();
    const location = useLocation();

    const redirectToPath = location.state?.redirectedFromPath || '/';

    const handleSubmit = (values) => login(values.email, values.password);

    return <div className='screen-container align-xy'>
        {
            isLoggedIn
                ? <Redirect to={redirectToPath} />
                : <LoginForm schema={AppSchema.LoginSchema} onSubmit={handleSubmit} />
        }
    </div>;
}