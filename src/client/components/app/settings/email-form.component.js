import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import BackIcon from '../../ui/icons/back.icon';
import SubmitButton from '../../ui/buttons/submit-button.component';

function EmailForm({ initialValues, onClickBack, onSubmit }) {
    return <Formik
        initialValues={initialValues}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {props => (
            <Form className='password-form' onSubmit={props.handleSubmit}>
                <div className="row justify-content-center form-primary">
                    <div className="col">
                        <div className='mb-4'>
                            <BackIcon className='me-3' onClick={onClickBack}/>
                            <label className='fw-bold font-size-19'>Change Email</label>
                        </div>

                        <div class="form-group mb-3">
                            <label className='fw-bold mb-1'>Email</label>
                            <Field type="email" name="email" className="form-control" id="email" placeholder="Enter email" autoComplete="off" />
                        </div>
                        {props.errors.email && <div id="feedback">{props.errors.email}</div>}

                        <div class="form-group mb-3">
                            <label className='fw-bold mb-1'>Password</label>
                            <Field type="password" name="password" className="form-control" id="password" placeholder="Enter new password" autoComplete="off" />
                        </div>
                        {props.errors.password && <div id="feedback">{props.errors.password}</div>}

                        <div className="d-flex justify-content-end" >
                            <SubmitButton extendedClass="mt-3" label='Save' onClick={props.handleSubmit} />
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>;
}

EmailForm.propTypes = {
    initialValues: PropTypes.object, 
    onClickBack: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired
};

export default EmailForm;