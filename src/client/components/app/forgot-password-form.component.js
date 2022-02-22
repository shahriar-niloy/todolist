import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import ValidationError from '../misc/validation-error.component';

function ForgotPasswordForm({ schema, initialValues, onSubmit }) {
    return <div className='forgot-password-form'>
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={values => onSubmit(values)}
        >
            {props => (
                <Form className="container p-3" onSubmit={props.handleSubmit}>
                    <div className="">
                        <div className="">
                            <div className="d-flex flex-column align-xy mb-3">
                                <div className='fw-bold font-size-16'>Forgot Password</div>
                                <div className="font-size-10 align-xy flex-column mt-2" style={{ color: 'grey' }}>
                                    <span>An email will be sent to the specified email with</span> 
                                    <span>instructions to reset your password</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <label for="email" className='font-size-13 fw-bold'>Email</label>
                                <Field type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter an email"/>
                                <ValidationError name='email' />
                            </div>
                            <button className="mt-3 forgot-password-submit" type="submit">Submit</button>
                        </div>
                    </div>
                    
                </Form>
            )}
        </Formik>
        <div className='forgot-password-footer'>
            Already have an account? <Link to='/login' className='ms-1'>Sign In</Link>
        </div>
    </div>;
}

ForgotPasswordForm.defaultProps = {
    initialValues: { email: '' }
};

export default ForgotPasswordForm;