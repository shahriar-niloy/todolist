import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from '../ui/buttons/submit-button.component';
import PriorityLevelIcon from '../ui/icons/priority-level.icon';
import ActionButton from '../ui/buttons/action-button.component';
import CalendarIcon from '../ui/icons/calendar.icon';
import Popover from '../lib/popover';
import TaskScheduler from './task-schedule.component';
import PrioritySelector from './priority-selector.component';

function TaskForm({ onSubmit, isEditing, task }) {
    const handleScheduledDateChange = (date, formikProps) => {
        console.log(date);
        formikProps.setFieldValue('scheduled_at', date);
    };

    return <Formik
        initialValues={{
            name: isEditing && task ? task.name : '',
            description: isEditing && task ? task.description : '',
            scheduled_at: isEditing && task ? task.scheduled_at : '',
            priority: isEditing && task ? task.priority : 'NONE'
        }}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {formikProps => (
            <Form className="container p-3 form-primary" onSubmit={formikProps.handleSubmit}>
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
                {formikProps.errors.name && <div id="feedback">{formikProps.errors.name}</div>}
                <div className="d-flex justify-content-between task-form-actions align-xy">
                    <Popover 
                        component={props => 
                            <TaskScheduler 
                                date={formikProps.values.scheduled_at} 
                                onDateChange={date => handleScheduledDateChange(date, formikProps)} 
                                {...props} 
                            />} 
                        extendedClassName="task-scheduler-popup" 
                        placement="left" 
                    >
                        <ActionButton>
                            <div className="align-xy">
                                <CalendarIcon fontSize={12} className="me-1" />
                                <span>{formikProps.values.scheduled_at && new Date(formikProps.values.scheduled_at).toLocaleString('default', { day: 'numeric', month: 'short' }) || 'Schedule'}</span>
                            </div>
                        </ActionButton>
                    </Popover>
                    <Popover 
                        component={props => 
                            <PrioritySelector
                                priority={formikProps.values.priority} 
                                onSelect={priority => formikProps.setFieldValue('priority', priority)} 
                                {...props} 
                            />} 
                        extendedClassName="task-scheduler-popup" 
                    >
                        <PriorityLevelIcon className="task-form-action-icon" fontSize={16} level={formikProps.values.priority} />
                    </Popover>
                </div>
                <div className="d-flex justify-content-end" >
                    <SubmitButton extendedClass="mt-3" label={isEditing ? 'Save' : 'Add task'} onClick={formikProps.handleSubmit} />
                </div>
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