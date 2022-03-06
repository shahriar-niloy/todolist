import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from '../ui/buttons/submit-button.component';
import ValidationError from '../misc/validation-error.component';

function ProjectForm({ icons, schema, isEditing, onSubmit, initialValues }) {
    return <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {props => (
            <Form className="container p-3 project-form" onSubmit={props.handleSubmit}>
                <div className="row justify-content-center form-primary">
                    <div className="col">
                        <div class="form-group">
                            <Field type="name" name="name" className="form-control" id="name" placeholder="Enter project name"/>
                        </div>
                        <ValidationError name='name' />
                    </div>
                </div>
                {icons && icons.length > 0 && <div className='mt-4'>
                    <h6 className='icons-header'>Project Icon</h6>
                    <div className='icons-container'>
                        {
                            icons.map(icon => {
                                return <label key={icon.id} className={`icon-wrapper ${props.values.icon_id === icon.id ? 'icon-wrapper-selected': ''}`}>
                                    <Field type="radio" name="icon_id" value={icon.id} />
                                    <i className={icon.class} />
                                </label>
                            })
                        }
                    </div>
                </div>}
                <div className="d-flex justify-content-end" >
                    <SubmitButton extendedClass="mt-3 fw-bold" label={isEditing ? 'Save' : 'Add'} onClick={props.handleSubmit} />
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
    isEditing: PropTypes.bool,
    icons: PropTypes.array
}

export default ProjectForm;