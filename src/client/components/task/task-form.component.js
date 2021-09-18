import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from '../ui/buttons/submit-button.component';

function TaskForm({ onSubmit, isEditing, task }) {
    return <Formik
        initialValues={{
            name: isEditing && task ? task?.name : '',
            description: isEditing && task ? task?.description : ''
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
                <SubmitButton extendedClass="mt-3" label={isEditing ? 'Save' : 'Add task'} onClick={props.handleSubmit} />
            </Form>
        )}
    </Formik>;
}

TaskForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    task: PropTypes.object,
    isEditing: PropTypes.bool
}

export default TaskForm;