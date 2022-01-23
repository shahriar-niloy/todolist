import React from 'react';
import PropTypes from 'prop-types';

import OptionIcon from '../ui/icons/options.component';
import Popover from '../lib/popover';
import TaskListManager from '../task/task-list-manager.component';

function TaskEditor({ 
    title, 
    tasks, 
    showCompletedTasks, 
    Menu, 
    readOnly,
    isDraggable,
    isRightActionsEnabled,
    onTaskAddIconClick, 
    onTaskDelete, 
    onTaskEdit, 
    onDrop, 
    onTaskComplete, 
    onTaskClick 
}) {
    return <div className="task-editor">
        <div className="d-flex justify-content-between align-items-center">
            <h4>{title}</h4>
            <div className="align-xy">
                {!readOnly && onTaskAddIconClick && <i class="fal fa-plus font-size-21 clickable me-3" onClick={onTaskAddIconClick} ></i>}
                {Menu && <Popover component={Menu} >
                    <OptionIcon />
                </Popover>}
            </div>
        </div>
        <hr></hr>
        <TaskListManager 
            tasks={tasks}
            showCompletedTasks={showCompletedTasks}
            isDraggable={!readOnly && isDraggable}
            isRightActionsEnabled={!readOnly && isRightActionsEnabled}
            isCompleteDisabled={readOnly}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
            onDrop={onDrop}
            onTaskComplete={onTaskComplete}
            onTaskClick={onTaskClick}
        />
    </div>
}

TaskEditor.defaultProps = {
    tasks: [],
    isDraggable: true,
    isRightActionsEnabled: true,
    readOnly: false
}

TaskEditor.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    showCompletedTasks: PropTypes.bool,
    readOnly: PropTypes.bool,
    Menu: PropTypes.func,
    isDraggable: PropTypes.bool,
    isRightActionsEnabled: PropTypes.bool,
    onTaskAddIconClick: PropTypes.func,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired
}

export default TaskEditor;