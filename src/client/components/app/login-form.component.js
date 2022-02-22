import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import ValidationError from '../misc/validation-error.component';

export default function Login({ schema, onSubmit }) {
    return <div className='login-form-container'>
        <Formik
            initialValues={{ 
                email: '',
                password: ''
            }}
            validationSchema={schema}
            onSubmit={(values, actions) => {
                onSubmit(values);
            }}
        >
            {props => (
                <Form className="container p-3" onSubmit={props.handleSubmit}>
                    <div className="">
                        <div className="">
                            <div className="d-flex flex-column align-xy mb-3">
                                <div className="font-size-10" style={{ color: 'grey' }}>WELCOME BACK</div>
                                <div className='fw-bold font-size-16'>Log into your account</div>
                            </div>
                            <div class="d-flex flex-column">
                                <label for="email" className='font-size-13 fw-bold'>Email</label>
                                <Field type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <ValidationError name='email' />
                            </div>
                            <div class="mt-3 d-flex flex-column">
                                <label for="password" className='font-size-13 fw-bold'>Password</label>
                                <Field type="password" name="password" id="password" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <ValidationError name='password' />
                            </div>
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                            <button className="mt-3 login-submit" type="submit">Login</button>
                        </div>
                    </div>
                    
                </Form>
            )}
        </Formik>
        <div className='login-footer'>
            Don't have an account? <Link to='/sign-up' className='ms-1'>Sign Up</Link>
        </div>
    </div>;
}