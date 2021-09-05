import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function Login({ onSubmit }) {
    return <div>
        <Formik
            initialValues={{ 
                email: '',
                password: ''
            }}
            onSubmit={(values, actions) => {
                onSubmit(values);
            }}
        >
            {props => (
                <Form onSubmit={props.handleSubmit}>
                    <Field type="text" name="email" />
                    <Field type="text" name="password" />
                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    <button type="submit">Login</button>
                </Form>
            )}
        </Formik>
    </div>;
}