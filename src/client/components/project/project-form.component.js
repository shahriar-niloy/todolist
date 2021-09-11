import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function ProjectForm({ onSubmit }) {
    return <Formik
        initialValues={{ 
            name: ''
        }}
        onSubmit={(values, actions) => {
            onSubmit(values);
        }}
    >
        {props => (
            <Form className="container p-3" onSubmit={props.handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col">
                        <div class="form-group">
                            <label className="fw-bold" for="name">Name</label>
                            <Field type="name" name="name" className="form-control" id="name" placeholder="Enter project name"/>
                        </div>
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <button className="mt-3 btn btn-primary" type="submit">Add</button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>;
}

ProjectForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default ProjectForm;