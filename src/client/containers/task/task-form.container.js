import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskForm from '../../components/task/task-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { createSubTaskAction, createTaskAction, getTaskAction, updateTaskAction } from '../../store/actions/task.action';

function TaskFormContainer({ 
    subtasks, 
    createAtOrder, 
    projectID, 
    taskID, 
    isDetailView, 
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

    useEffect(() => {
        if (taskID) dispatch(getTaskAction(taskID));
    }, [taskID]);

    return <TaskForm 
        task={task} 
        subtasks={subtasks}
        isEditing={!!taskID} 
        isDetailView={isDetailView} 
        onSubmit={handleSubmit} 
        onTaskEdit={onTaskEdit}
        onTaskDelete={onTaskDelete}
        onDrop={onDrop}
        onTaskComplete={onTaskComplete}
        onTaskClick={onTaskClick}
        onSubtaskAdd={handleSubtaskAdd}
        onNavigateToParentTask={onNavigateToParentTask}
    />
}

TaskFormContainer.propTypes = {
    onSubmitSuccess: PropTypes.func.isRequired,
    createAtOrder: PropTypes.number.isRequired,
    projectID: PropTypes.string.isRequired,
    taskID: PropTypes.string,
    isDetailView: PropTypes.bool,
    subtasks: PropTypes.array,
    onTaskEdit: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    onNavigateToParentTask: PropTypes.func
}

export default TaskFormContainer;