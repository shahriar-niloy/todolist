import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import TaskForm from '../../components/task/task-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { createSubTaskAction, createTaskAction, createTaskAttachmentAction, getTaskAction, getTaskAttachmentAction, updateTaskAction } from '../../store/actions/task.action';
import { convertDateToUTC } from '../../utility';
import { deleteAttachmentAction } from '../../store/actions/attachment.action';
import { showToast } from '../../components/toast/toast.component';
import ToastTypes from '../../constants/toast.types';
import { convertBufferToBlob } from '../../utility';

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
    const { details: task, attachments } = useSelector(state => state.task);
    
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
    };

    const handleSaveAttachment = data => {
        dispatch(createTaskAttachmentAction(
            data, 
            () => dispatch(getTaskAttachmentAction(taskID)),
            errors => showToast(ToastTypes.ERROR, errors.map(error => error.message))
        ));
    };

    const handleDeleteAttachment = id => {
        dispatch(deleteAttachmentAction(id));
    };

    const handleTabOpen = tabKey => {
        if (tabKey === 'ATTACHMENT' && taskID) dispatch(getTaskAttachmentAction(taskID));
    };

    const handleFileOpen = (data, fileName, mimetype) => {
        fileDownload(convertBufferToBlob(data, mimetype), fileName);
    };

    useEffect(() => {
        if (taskID) dispatch(getTaskAction(taskID));
    }, [taskID]);

    return <TaskForm 
        task={task} 
        attachments={attachments}
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
        onSaveAttachment={handleSaveAttachment}
        onDeleteAttachment={handleDeleteAttachment}
        onTabOpen={handleTabOpen}
        onFileOpen={handleFileOpen}
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