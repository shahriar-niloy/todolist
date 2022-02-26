import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import ValidationError from '../misc/validation-error.component';

function ResetPasswordForm({ schema, initialValues, onSubmit }) {
    return <div className='default-form-container'>
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
                                <div className='fw-bold font-size-16'>Reset Password</div>
                                <div className="font-size-10 align-xy flex-column mt-2" style={{ color: 'grey' }}>
                                    <span>Setup a new password for your account</span> 
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <label for="new_password" className='font-size-13 fw-bold'>New Password</label>
                                <Field type="password" name="new_password" id="new_password" placeholder="Enter new password"/>
                                <ValidationError name='new_password' />
                            </div>

                            <div class="d-flex flex-column mt-3">
                                <label for="confirm_password" className='font-size-13 fw-bold'>Confirm Password</label>
                                <Field type="password" name="confirm_password" id="confirm_password" placeholder="Enter password again"/>
                                <ValidationError name='confirm_password' />
                            </div>

                            <button className="mt-3 default-form-submit" type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        <div className='default-form-footer flex-row'>
            Already have an account? <Link to='/login' className='ms-1'>Sign In</Link>
        </div>
    </div>;
}

ResetPasswordForm.defaultProps = {
    initialValues: { 
        new_password: '',
        confirm_password: ''
    }
};

export default ResetPasswordForm;