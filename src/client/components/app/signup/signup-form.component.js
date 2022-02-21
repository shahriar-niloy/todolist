import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function SignUpForm({ initialValues, onSubmit }) {
    return <div className='signup-form'>
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmit(values)}
        >
            {props => (
                <Form className="container p-3" onSubmit={props.handleSubmit}>
                    <div className="">
                        <div className="">
                            <div className="d-flex flex-column align-xy mb-3">
                                <div className="font-size-10" style={{ color: 'grey' }}>WELCOME</div>
                                <div className='fw-bold font-size-16'>Create an account</div>
                            </div>

                            <div className="d-flex flex-column">
                                <label for="first_name" className='font-size-13 fw-bold'>First Name</label>
                                <Field type="name" name="first_name" id="first_name" aria-describedby="nameHelp" placeholder="Enter first name" />
                            </div>

                            <div className="mt-3 d-flex flex-column">
                                <label for="last_name" className='font-size-13 fw-bold'>Last Name</label>
                                <Field type="name" name="last_name" id="last_name" aria-describedby="nameHelp" placeholder="Enter last name" />
                            </div>

                            <div className="mt-3 d-flex flex-column">
                                <label for="email" className='font-size-13 fw-bold'>Email</label>
                                <Field type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter an email"/>
                            </div>
                            
                            <div className="mt-3 d-flex flex-column">
                                <label for="password" className='font-size-13 fw-bold'>Password</label>
                                <Field type="password" name="password" id="password" aria-describedby="emailHelp" placeholder="Enter a password"/>
                            </div>
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}

                            <div className="mt-3 d-flex flex-column">
                                <label for="confirm_password" className='font-size-13 fw-bold'>Confirm Password</label>
                                <Field type="password" name="confirm_password" id="confirm_password" placeholder="Enter password again"/>
                            </div>
                            {props.errors.name && <div id="feedback">{props.errors.confirm_password}</div>}

                            <button className="mt-3 signup-submit" type="submit">Sign Up</button>
                        </div>
                    </div>
                    
                </Form>
            )}
        </Formik>
        <div className='signup-footer'>
            Already have an account? <Link to='/login' className='ms-1'>Sign In</Link>
        </div>
    </div>;
}

SignUpForm.defaultProps = {
    initialValues: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    }
}

SignUpForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
};

export default SignUpForm;