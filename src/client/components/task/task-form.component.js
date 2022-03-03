import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from '../ui/buttons/submit-button.component';
import PriorityLevelIcon from '../ui/icons/priority-level.icon';
import ActionButton from '../ui/buttons/action-button.component';
import CalendarIcon from '../ui/icons/calendar.icon';
import Popover from '../lib/popover';
import TaskScheduler from './task-schedule.component';
import PrioritySelector from './priority-selector.component';
import { Tabs, Tab } from 'react-bootstrap';
import TaskListManager from './task-list-manager.component';
import AddIcon from '../ui/icons/add.icon';
import BranchIcon from '../ui/icons/branch.icon';
import SquareIcon from '../ui/icons/square.icon';
import CheckSquareIcon from '../ui/icons/check-square.icon';
import TaskAttachments from './task-attachment.component';
import TaskComments from './task-comment.component';
import ValidationError from '../misc/validation-error.component';
import DeleteButton from '../ui/buttons/delete-button.component';

const TABS = {
    COMMENT: 'COMMENT',
    SUBTASK: 'SUBTASK',
    ATTACHMENT: 'ATTACHMENT'
};

function SubtaskForm({ parent_id, onCancel, onSubmit }) {
    const handleScheduledDateChange = (date, formikProps) => {
        formikProps.setFieldValue('scheduled_at', date);
    };

    return <Formik
        initialValues={{
            name: '',
            description: '',
            scheduled_at: '',
            priority: 'NONE',
            parent_task_id: parent_id
        }}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {formikProps => (
            <Form className={`container p-3 form-primary`} onSubmit={formikProps.handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div class="form-group">
                            <Field type="name" name="name" className="form-control" id="name" placeholder="Enter task name"/>
                        </div>
                    </div>
                    <div className="col-12 desc-container">
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
                                onDateChange={date => {
                                    handleScheduledDateChange(date, formikProps);
                                }} 
                                {...props} 
                            />} 
                        extendedClassName="task-scheduler-popup" 
                        placement="left" 
                    >
                        <ActionButton>
                            <div className="align-xy">
                                <CalendarIcon fontSize={12} className="me-2" />
                                <span>{formikProps.values.scheduled_at && new Date(formikProps.values.scheduled_at).toLocaleString('default', { day: 'numeric', month: 'short' }) || 'Schedule'}</span>
                            </div>
                        </ActionButton>
                    </Popover>
                    <Popover 
                        component={props => 
                            <PrioritySelector
                                priority={formikProps.values.priority} 
                                onSelect={priority => { 
                                    formikProps.setFieldValue('priority', priority);
                                }} 
                                {...props} 
                            />} 
                        extendedClassName="task-scheduler-popup" 
                    >
                        <PriorityLevelIcon className="task-form-action-icon" fontSize={16} level={formikProps.values.priority} />
                    </Popover>
                </div>
                <div className="d-flex justify-content-end" >
                    <DeleteButton extendedClass="mt-3 me-2" label='Cancel' onClick={onCancel} />
                    <SubmitButton extendedClass="mt-3" label='Add Subtask' onClick={formikProps.handleSubmit} />
                </div>
            </Form>
        )}
    </Formik>
}

function TaskForm({ 
    schema,
    isEditing, 
    subtasks, 
    task, 
    attachments,
    comments,
    currentUserID,
    defaultTab,
    isDetailView,
    isEditDisabled,
    isCompleteDisabled,
    isAttachmentReadOnly,
    transformDate, 
    onSubtaskAdd,
    onSubmit, 
    onTaskEdit, 
    onTaskDelete, 
    onDrop, 
    onTaskComplete, 
    onSubTaskComplete,
    onTaskClick,
    onNavigateToParentTask,
    onSaveAttachment,
    onTabOpen,
    onFileOpen,
    onDeleteAttachment,
    onMentionSuggestion,
    onCommentSubmit,
    onCommentDelete
}) {
    const [selectedTab, setSelectedTab] = useState(defaultTab || TABS.SUBTASK);
    const [overrideDetailView, setOverrideDetailView] = useState(false);
    const [isAddingSubtask, setIsAddingSubtask] = useState(false);

    const isEditModeAllowed = !isEditDisabled && !task?.is_completed;
    const isDetailViewEnabled = !isEditModeAllowed || (isDetailView && !overrideDetailView);

    const handleScheduledDateChange = (date, formikProps) => {
        if (transformDate) date = transformDate(date);
        formikProps.setFieldValue('scheduled_at', date);
    };

    useEffect(() => {
        if (defaultTab) setSelectedTab(defaultTab);
    }, [defaultTab]);

    return <Formik
        initialValues={{
            name: isEditing && task ? task.name : '',
            description: isEditing && task ? task.description : '',
            scheduled_at: isEditing && task ? task.scheduled_at : '',
            priority: isEditing && task ? task.priority : 'NONE'
        }}
        validationSchema={schema}
        onSubmit={values => onSubmit(values)}
        enableReinitialize
    >
        {formikProps => (
            <Form className={`container p-3 form-primary ${isDetailViewEnabled ? 'task-form-detailview' : ''}`} onSubmit={formikProps.handleSubmit}>
                <div className="row justify-content-center">
                    {task && task.parent_task_id && task.parentTask && <div className="parent-task-navigator" onClick={() => onNavigateToParentTask(task.parent_task_id)} >
                        <BranchIcon className="" fontSize={13} />
                        <span>{task.parentTask.name}</span>
                    </div>}
                    <div className="col-12 title-container">
                        <div class="form-group">
                            {isDetailViewEnabled
                                ? <span className="title" onClick={() => isEditModeAllowed && setOverrideDetailView(true)} >{formikProps.values.name}</span>
                                : <div>
                                    <Field type="name" name="name" className="form-control" id="name" placeholder="Enter task name"/>
                                    <ValidationError name='name' />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-12 desc-container">
                        <div class="form-group">
                            {isDetailViewEnabled
                                ? formikProps.values.description 
                                    ? <span onClick={() => isEditModeAllowed && setOverrideDetailView(true)} >{formikProps.values.description}</span>
                                    : <span onClick={() => isEditModeAllowed && setOverrideDetailView(true)} className="placeholder-text" >Description</span>
                                : <div>
                                    <Field as="textarea" rows="4" type="text" name="description" className="form-control" id="description" placeholder="Enter task description"/>
                                    <ValidationError name='description' />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between task-form-actions align-xy">
                    <Popover 
                        component={props => 
                            <TaskScheduler 
                                date={formikProps.values.scheduled_at} 
                                isDisabled={isDetailViewEnabled}
                                onDateChange={date => {
                                    handleScheduledDateChange(date, formikProps);
                                    isEditModeAllowed && setOverrideDetailView(true);
                                }} 
                                {...props} 
                            />} 
                        extendedClassName="task-scheduler-popup" 
                        placement="left" 
                        disabled={!isEditModeAllowed}
                    >
                        <ActionButton>
                            <div className="align-xy">
                                <CalendarIcon fontSize={12} className="me-2" />
                                <span>{formikProps.values.scheduled_at && new Date(formikProps.values.scheduled_at).toLocaleString('default', { day: 'numeric', month: 'short' }) || 'Schedule'}</span>
                            </div>
                        </ActionButton>
                    </Popover>
                    <div>
                        {task?.is_completed 
                            ? <CheckSquareIcon className={`font-size-17 task-form-action-icon me-2 ${isCompleteDisabled ? 'click-disabled' : ''}`} onClick={() => onTaskComplete(task?.id, true)} />
                            : <SquareIcon className={`font-size-17 task-form-action-icon me-2 ${isCompleteDisabled ? 'click-disabled' : ''}`} onClick={() => onTaskComplete(task?.id, false)} /> 
                        }
                        <Popover 
                            component={props => 
                                <PrioritySelector
                                    priority={formikProps.values.priority} 
                                    onSelect={priority => { 
                                        formikProps.setFieldValue('priority', priority);
                                        isEditModeAllowed && setOverrideDetailView(true);
                                    }} 
                                    {...props} 
                                />} 
                            extendedClassName="task-scheduler-popup" 
                            disabled={!isEditModeAllowed}
                        >
                            <PriorityLevelIcon className="task-form-action-icon" fontSize={16} level={formikProps.values.priority} />
                        </Popover>
                    </div>
                </div>
                {(!isDetailView || overrideDetailView) && <div className="d-flex justify-content-end" >
                    <SubmitButton extendedClass="mt-3" label={isEditing ? 'Save' : 'Add task'} onClick={formikProps.handleSubmit} />
                </div>}
                {(isEditing || isDetailView) && <Tabs
                    id="controlled-tab-example"
                    activeKey={selectedTab}
                    onSelect={k => {
                        onTabOpen(k);
                        setSelectedTab(k);
                    }}
                    className="mb-3 task-form-tabs"
                >
                    <Tab eventKey={TABS.SUBTASK} title="Subtasks" tabClassName={`tab-button ${selectedTab === TABS.SUBTASK ? 'selected' : ''}`}>
                        <div className="ms-5 task-editor" style={{ minWidth: '0%' }} >
                            <TaskListManager 
                                tasks={subtasks}
                                showCompletedTasks={true}
                                isCompleteDisabled={isCompleteDisabled}
                                onTaskEdit={onTaskEdit}
                                onTaskDelete={onTaskDelete}
                                onDrop={onDrop}
                                onTaskComplete={onSubTaskComplete}
                                onTaskClick={onTaskClick}
                            />
                            {isAddingSubtask && 
                                <SubtaskForm 
                                    parent_id={task?.id}
                                    onSubmit={values => { 
                                        onSubtaskAdd(values); 
                                        setIsAddingSubtask(false); 
                                    }}
                                    onCancel={() => setIsAddingSubtask(false)} 
                                />
                            }
                            {!isAddingSubtask && isEditModeAllowed && <div className="add-subtask" onClick={() => setIsAddingSubtask(true)} >
                                <span className="add-icon">
                                    <AddIcon onclick={() => console.log('Add subtask')} />
                                </span>
                                <span>Add Subtask</span>
                            </div>}
                        </div>
                    </Tab>
                    <Tab eventKey={TABS.COMMENT} title="Comments" tabClassName={`tab-button ${selectedTab === TABS.COMMENT ? 'selected' : ''}`}>
                        <TaskComments 
                            comments={comments}
                            currentUserID={currentUserID}
                            onMentionSuggestion={onMentionSuggestion}
                            onCommentSubmit={onCommentSubmit}
                            onCommentDelete={onCommentDelete}
                        />
                    </Tab>
                    <Tab eventKey={TABS.ATTACHMENT} title="Attachments" tabClassName={`tab-button ${selectedTab === TABS.ATTACHMENT ? 'selected' : ''}`} >
                        {selectedTab === TABS.ATTACHMENT && 
                            <TaskAttachments 
                                attachments={attachments}
                                task_id={task?.id}
                                readOnly={isAttachmentReadOnly}
                                onSaveAttachment={onSaveAttachment}
                                onDeleteAttachment={onDeleteAttachment}
                                onFileOpen={onFileOpen}
                            />
                        }
                    </Tab>
                </Tabs>}
            </Form>
        )}
    </Formik>;
}

TaskForm.defaultProps = {
    task: {},
    isDetailView: false,
    isEditing: false,
    isAttachmentReadOnly: false
}

TaskForm.propTypes = {
    isDetailView: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    task: PropTypes.object,
    attachments: PropTypes.array,
    defaultTab: PropTypes.string,
    currentUserID: PropTypes.string,
    subtasks: PropTypes.array,
    isEditing: PropTypes.bool,
    isAttachmentReadOnly: PropTypes.bool,
    transformDate: PropTypes.func,
    onSubtaskAdd: PropTypes.func,
    onNavigateToParentTask: PropTypes.func,
    onSaveAttachment: PropTypes.func,
    onTabOpen: PropTypes.func,
    onDeleteAttachment: PropTypes.func,
    onFileOpen: PropTypes.func,
    onMentionSuggestion: PropTypes.func.isRequired,
    onCommentSubmit: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    onSubTaskComplete: PropTypes.func.isRequired
}

export default TaskForm;