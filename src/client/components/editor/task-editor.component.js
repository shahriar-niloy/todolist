import React from 'react';
import PropTypes from 'prop-types';

import OptionIcon from '../ui/icons/options.component';
import Popover from '../lib/popover';
import TaskListManager from '../task/task-list-manager.component';

function TaskEditor({ projectName, tasks, showCompletedTasks, onTaskAddIconClick, onTaskDelete, onTaskEdit, onDrop, onTaskComplete, ProjectMenu, onTaskClick }) {
    return <div className="task-editor">
        <div className="d-flex justify-content-between align-items-center">
            <h4>{projectName}</h4>
            <div className="align-xy">
                <i class="fal fa-plus font-size-21 clickable me-3" onClick={onTaskAddIconClick} ></i>
                <Popover component={ProjectMenu} >
                    <OptionIcon />
                </Popover>
            </div>
        </div>
        <hr></hr>
        <TaskListManager 
            tasks={tasks}
            showCompletedTasks={showCompletedTasks}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
            onDrop={onDrop}
            onTaskComplete={onTaskComplete}
            onTaskClick={onTaskClick}
        />
    </div>
}

TaskEditor.defaultProps = {
    tasks: []
}

TaskEditor.propTypes = {
    projectName: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    showCompletedTasks: PropTypes.bool,
    onTaskAddIconClick: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    ProjectMenu: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired
}

export default TaskEditor;