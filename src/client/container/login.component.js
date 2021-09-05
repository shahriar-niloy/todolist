import React from 'react';
import { loginActionCreator } from '../store/actions/authenticate.action';
import LoginForm from '../components/app/login-form.component';
import { useDispatch } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();

    const handleSubmit = (values) => dispatch(loginActionCreator(values.email, values.password));

    return <div>
        <LoginForm onSubmit={handleSubmit} />
    </div>;
}