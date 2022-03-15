import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import TaskForm from '../../components/task/task-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { createSubTaskAction, createTaskAction, createTaskAttachmentAction, getTaskAction, getTaskAttachmentAction, getTaskCommentsAction, updateTaskAction } from '../../store/actions/task.action';
import { convertDateToUTC } from '../../utility';
import { deleteAttachmentAction } from '../../store/actions/attachment.action';
import { showToast } from '../../components/toast/toast.component';
import ToastTypes from '../../constants/toast.types';
import { convertBufferToBlob } from '../../utility';
import { debouncedSearchUsersAction } from '../../store/actions/user.actions';
import { createCommentAction, deleteCommentAction } from '../../store/actions/comment.actions';
import { TaskSchema } from '../../../common';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

function TaskFormContainer({  
    createAtOrder, 
    projectID, 
    isDetailView, 
    isEditDisabled,
    isCompleteDisabled,
    isAttachmentReadOnly,
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
    const comments = useSelector(state => state.task.comments);
    const currentUser = useSelector(state => state.user.profile);
    const { taskToSubtask } = useSelector(state => state.task.list);
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const matchedRoute = useRouteMatch();

    const searchParams = new URLSearchParams(location.search);
    const taskID = params.taskID;
    const subtasks = taskToSubtask?.get(taskID);
    const tabFromUrl = searchParams.get('tab');

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
        if (!taskID) return;

        onTaskComplete(taskID, isCurrentlyComplete, () => {
            dispatch(getTaskAction(taskID));
        });
    };

    const handleSubTaskComplete = (subtaskID, isCurrentlyComplete) => {
        onTaskComplete(subtaskID, isCurrentlyComplete, () => {
            dispatch(getTaskAction(taskID));
        });
    };

    const handleTaskProgress = (loaded, total, onProgress) => onProgress && onProgress(Math.round((loaded * 100) / total));

    const handleSaveAttachment = (data, onSuccess, onProgress) => {
        dispatch(createTaskAttachmentAction(
            data, 
            () => {
                dispatch(getTaskAttachmentAction(taskID));
                onSuccess && onSuccess();
            },
            errors => showToast(ToastTypes.ERROR, errors.map(error => error.message)),
            (loaded, total) => handleTaskProgress(loaded, total, onProgress)
        ));
    };

    const handleDeleteAttachment = id => {
        dispatch(deleteAttachmentAction(id));
    };

    const loadTabContent = tabKey => {
        if (tabKey === 'ATTACHMENT' && taskID) dispatch(getTaskAttachmentAction(taskID));
        if (tabKey === 'COMMENT' && taskID) dispatch(getTaskCommentsAction(taskID));
    };

    const handleTabOpen = tabKey => {
        loadTabContent(tabKey);
        history.push(`${matchedRoute.url}?tab=${tabKey}`);
    };

    const handleFileOpen = (data, fileName, mimetype) => {
        fileDownload(convertBufferToBlob(data, mimetype), fileName);
    };

    const handleMenuSuggestion = (query, done) => {
        dispatch(debouncedSearchUsersAction(query, null, users => {
            done(users.data.map(user => ({ id: user.id, display: `${user.first_name} ${user.last_name}` })));
        }));
    }

    const handleCommentSubmit = (commentText, parentID, mentions, done) => {
        dispatch(
            createCommentAction({
                comment: commentText,
                task_id: taskID,
                parent_id: parentID,
                mentioned_users: mentions.map(m => m.id)
            }, () => {
                dispatch(getTaskCommentsAction(taskID));
                done();
            })
        );
    }

    const handleCommentDelete = commentID => {
        dispatch(
            deleteCommentAction(
                commentID, 
                () => dispatch(getTaskCommentsAction(taskID))
            )
        );
    }

    useEffect(() => {
        if (taskID) dispatch(getTaskAction(taskID));
        if (tabFromUrl) loadTabContent(tabFromUrl);
    }, [taskID]);

    return <TaskForm 
        schema={TaskSchema.TaskFormSchema}
        task={task} 
        attachments={attachments}
        comments={comments}
        subtasks={subtasks}
        currentUserID={currentUser.id}
        defaultTab={tabFromUrl}
        isEditing={!!taskID} 
        isDetailView={isDetailView} 
        isEditDisabled={isEditDisabled}
        isCompleteDisabled={isCompleteDisabled}
        isAttachmentReadOnly={isAttachmentReadOnly}
        transformDate={date => { 
            if (!date) return '';
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            return convertDateToUTC(date);
        }}
        onSubmit={handleSubmit} 
        onTaskEdit={onTaskEdit}
        onTaskDelete={onTaskDelete}
        onDrop={onDrop}
        onTaskComplete={handleTaskComplete}
        onSubTaskComplete={handleSubTaskComplete}
        onTaskClick={onTaskClick}
        onSubtaskAdd={handleSubtaskAdd}
        onNavigateToParentTask={onNavigateToParentTask}
        onSaveAttachment={handleSaveAttachment}
        onDeleteAttachment={handleDeleteAttachment}
        onTabOpen={handleTabOpen}
        onFileOpen={handleFileOpen}
        onMentionSuggestion={handleMenuSuggestion}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
    />
}

TaskFormContainer.defaultProps = {
    isEditDisabled: false
}

TaskFormContainer.propTypes = {
    createAtOrder: PropTypes.number.isRequired,
    projectID: PropTypes.string.isRequired,
    isDetailView: PropTypes.bool,
    isEditDisabled: PropTypes.bool,
    isCompleteDisabled: PropTypes.bool,
    isAttachmentReadOnly: PropTypes.bool,
    onSubmitSuccess: PropTypes.func,
    onTaskEdit: PropTypes.func,
    onTaskDelete: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    onNavigateToParentTask: PropTypes.func
}

export default TaskFormContainer;