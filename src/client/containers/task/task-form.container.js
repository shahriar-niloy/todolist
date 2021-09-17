import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskForm from '../../components/task/task-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, getTaskAction, updateTaskAction } from '../../store/actions/task.action';

function TaskFormContainer({ onSubmitSuccess, order, projectID, taskID }) {
    const dispatch = useDispatch();
    const task = useSelector(state => state.task.details);

    const handleSubmit = values => {
        values.order = order;
        values.project_id = projectID;
        
        if (taskID) dispatch(updateTaskAction(taskID, values))
        else dispatch(createTaskAction(values));

        onSubmitSuccess && onSubmitSuccess();
    };

    useEffect(() => {
        if (taskID) dispatch(getTaskAction(taskID));
    }, [taskID]);

    return <TaskForm task={task} isEditing={!!taskID} onSubmit={handleSubmit} />
}

TaskFormContainer.propTypes = {
    onSubmitSuccess: PropTypes.func.isRequired,
    order: PropTypes.number.isRequired,
    projectID: PropTypes.string.isRequired,
    taskID: PropTypes.string
}

export default TaskFormContainer;