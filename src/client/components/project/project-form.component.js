import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from '../ui/buttons/submit-button.component';

function ProjectForm({ isEditing, onSubmit, initialValues }) {
    return <Formik
        initialValues={initialValues}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {props => (
            <Form className="container p-3" onSubmit={props.handleSubmit}>
                <div className="row justify-content-center form-primary">
                    <div className="col">
                        <div class="form-group">
                            <Field type="name" name="name" className="form-control" id="name" placeholder="Enter project name"/>
                        </div>
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <div className="d-flex justify-content-end" >
                            <SubmitButton extendedClass="mt-3" label={isEditing ? 'Save' : 'Add'} onClick={props.handleSubmit} />
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>;
}

ProjectForm.defaultProps = {
    initialValues: { name: '' },
    isEditing: false
}

ProjectForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool
}

export default ProjectForm;