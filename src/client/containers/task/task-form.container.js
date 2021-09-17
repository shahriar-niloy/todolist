import React from 'react';
import PropTypes from 'prop-types';
import TaskForm from '../../components/task/task-form.component';
import { useDispatch } from 'react-redux';
import { createTaskAction } from '../../store/actions/task.action';

function TaskFormContainer({ onSubmitSuccess, order, projectID }) {
    const dispatch = useDispatch();

    const handleSubmit = values => {
        values.order = order;
        values.project_id = projectID;
        dispatch(createTaskAction(values));
        onSubmitSuccess && onSubmitSuccess();
    };

    return <TaskForm onSubmit={handleSubmit} />
}

TaskFormContainer.propTypes = {
    onSubmitSuccess: PropTypes.func.isRequired,
    order: PropTypes.number.isRequired,
    projectID: PropTypes.string.isRequired
}

export default TaskFormContainer;