import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/app/login-form.component';
import useAuth from '../hooks/useAuth.hook';

export default function Login() {
    const { isLoggedIn, login } = useAuth();

    const handleSubmit = (values) => login(values.email, values.password);

    return <div>
        {
            isLoggedIn
                ? <Redirect to="/" />
                : <LoginForm onSubmit={handleSubmit} />
        }
    </div>;
}