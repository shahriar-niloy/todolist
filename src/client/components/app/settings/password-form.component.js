import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import BackIcon from '../../ui/icons/back.icon';
import SubmitButton from '../../ui/buttons/submit-button.component';
import ValidationError from '../../misc/validation-error.component';

function PasswordForm({ schema, initialValues, onClickBack, onSubmit }) {
    return <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {props => (
            <Form className='password-form' onSubmit={props.handleSubmit}>
                <div className="row justify-content-center form-primary">
                    <div className="col">
                        <div className='d-flex mb-4 align-items-center'>
                            <BackIcon onClick={onClickBack} className="me-3" />
                            <div className='fw-bold font-size-19'>Change Password</div>
                        </div>
                        <div class="form-group mb-3">
                            <label className='fw-bold mb-1'>Current Password</label>
                            <Field type="password" name="current_password" className="form-control" id="current_password" placeholder="Enter current password"/>
                            <ValidationError name='current_password' />
                        </div>
                        

                        <div class="form-group mb-3">
                            <label className='fw-bold mb-1'>New Password</label>
                            <Field type="password" name="new_password" className="form-control" id="new_password" placeholder="Enter new password"/>
                            <ValidationError name='new_password' />
                        </div>

                        <div class="form-group mb-3">
                            <label className='fw-bold mb-1'>Confirm Password</label>
                            <Field type="password" name="confirm_password" className="form-control" id="confirm_password" placeholder="Enter confirm password"/>
                            <ValidationError name='confirm_password' />
                        </div>

                        <div className="d-flex justify-content-end" >
                            <SubmitButton extendedClass="mt-3" label='Save' onClick={props.handleSubmit} />
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>;
}

PasswordForm.propTypes = {
    initialValues: PropTypes.object, 
    onClickBack: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired
};

export default PasswordForm;