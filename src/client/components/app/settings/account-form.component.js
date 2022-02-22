import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from '../../ui/buttons/submit-button.component';
import ValidationError from '../../misc/validation-error.component';

function AccountForm({ schema, profile, onChangeEmailClick, onChangePasswordClick, onSubmit }) {
    return <Formik
        className='account-form'
        initialValues={{
            first_name: profile?.first_name || '',
            last_name: profile?.last_name || ''
        }}
        validationSchema={schema}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {props => (
            <Form className='account-form' onSubmit={props.handleSubmit}>
                <div className="row justify-content-center form-primary">
                    <div className="col">
                        <div className='d-flex mb-4 align-items-center'>
                            <div className='fw-bold font-size-19'>Account</div>
                        </div>
                        <div class="form-group mb-3">
                            <label className='fw-bold mb-2'>First Name</label>
                            <Field type="name" name="first_name" className="form-control" id="first_name" placeholder="Enter first name"/>
                            <ValidationError name='first_name' />
                        </div>

                        <div class="form-group mb-3">
                            <label className='fw-bold mb-2'>Last Name</label>
                            <Field type="name" name="last_name" className="form-control" id="last_name" placeholder="Enter last name"/>
                            <ValidationError name='last_name' />
                        </div>

                        <div class="form-group mb-3">
                            <div>
                                <label className='fw-bold mb-2 me-1'>Email </label>
                                <div className='mb-2'>{profile?.email || ''}</div>
                            </div>
                            <span className="change-password-button" onClick={onChangeEmailClick}>Change Email</span>
                        </div>

                        <div class="form-group mb-3">
                            <div>
                                <label className='fw-bold mb-2 me-1'>Password </label>
                            </div>
                            <span className="change-password-button" onClick={onChangePasswordClick}>Change Password</span>
                        </div>

                        <div className="d-flex justify-content-end" >
                            <SubmitButton extendedClass="mt-3" label='Save' onClick={props.handleSubmit} />
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>;
};

AccountForm.propTypes = {
    profile: PropTypes.object, 
    onChangeEmailClick: PropTypes.func.isRequired, 
    onChangePasswordClick: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired
};

export default AccountForm;