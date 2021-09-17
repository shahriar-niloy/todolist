import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function TaskForm({ onSubmit, isEditing }) {
    return <Formik
        initialValues={{
            name: '',
            description: ''
        }}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {props => (
            <Form className="container p-3 task-form" onSubmit={props.handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div class="form-group">
                            <Field type="name" name="name" className="form-control" id="name" placeholder="Enter task name"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div class="form-group">
                            <Field as="textarea" rows="4" type="text" name="description" className="form-control" id="description" placeholder="Enter task description"/>
                        </div>
                    </div>
                </div>
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                <button className="mt-3 btn btn-primary" type="submit">{isEditing ? 'Save' : 'Add task'}</button>
            </Form>
        )}
    </Formik>;
}

TaskForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default TaskForm;