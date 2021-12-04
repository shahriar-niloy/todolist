import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskForm from '../../components/task/task-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { createSubTaskAction, createTaskAction, getTaskAction, updateTaskAction } from '../../store/actions/task.action';
import { convertDateToUTC } from '../../utility';

function TaskFormContainer({ 
    subtasks, 
    createAtOrder, 
    projectID, 
    taskID, 
    isDetailView, 
    isEditDisabled,
    onTaskEdit, 
    onTaskDelete, 
    onDrop, 
    onTaskComplete, 
    onTaskClick, 
    onSubmitSuccess, 
    onNavigateToParentTask
}) {
    const dispatch = useDispatch();
    const task = useSelector(state => state.task.details);

    const handleSubmit = values => {
        values.project_id = projectID;
        
        if (taskID) dispatch(updateTaskAction(taskID, values))
        else {
            values.order = createAtOrder;
            dispatch(createTaskAction(values));
        }

        onSubmitSuccess && onSubmitSuccess();
    };

    const handleSubtaskAdd = values => {
        values.order = subtasks?.length || 0;
        values.project_id = projectID;
        dispatch(createSubTaskAction(values));
    }

    const handleTaskComplete = (taskID, isCurrentlyComplete) => {
        onTaskComplete(taskID, isCurrentlyComplete, () => {
            dispatch(getTaskAction(taskID));
        });
    }

    useEffect(() => {
        if (taskID) dispatch(getTaskAction(taskID));
    }, [taskID]);

    return <TaskForm 
        task={task} 
        subtasks={subtasks}
        isEditing={!!taskID} 
        isDetailView={isDetailView} 
        isEditDisabled={isEditDisabled}
        transformDate={date => { 
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            return convertDateToUTC(date)
        }}
        onSubmit={handleSubmit} 
        onTaskEdit={onTaskEdit}
        onTaskDelete={onTaskDelete}
        onDrop={onDrop}
        onTaskComplete={handleTaskComplete}
        onTaskClick={onTaskClick}
        onSubtaskAdd={handleSubtaskAdd}
        onNavigateToParentTask={onNavigateToParentTask}
    />
}

TaskFormContainer.defaultProps = {
    isEditDisabled: false
}

TaskFormContainer.propTypes = {
    createAtOrder: PropTypes.number.isRequired,
    projectID: PropTypes.string.isRequired,
    taskID: PropTypes.string,
    isDetailView: PropTypes.bool,
    isEditDisabled: PropTypes.bool,
    subtasks: PropTypes.array,
    onSubmitSuccess: PropTypes.func,
    onTaskEdit: PropTypes.func,
    onTaskDelete: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    onNavigateToParentTask: PropTypes.func
}

export default TaskFormContainer;