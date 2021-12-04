import React from 'react';
import DragPreview from '../dragpreview/drag-preview.component';
import NoTask from '../task/no-task.component';
import PropTypes from 'prop-types';
import TaskListItem from './task-list-item.component';

function TaskListManager({
    tasks,
    showCompletedTasks,
    isDraggable,
    isRightActionsEnabled,
    onTaskEdit,
    onTaskDelete,
    onDrop,
    onTaskComplete,
    onTaskClick
}) {
    return (
        <div>
            {tasks &&
                tasks.map((task) =>
                    showCompletedTasks || !task.is_completed ? (
                        <TaskListItem
                            key={task.id}
                            tasks={tasks}
                            task={task}
                            showCompletedTasks={showCompletedTasks}
                            isDraggable={isDraggable}
                            isRightActionsEnabled={isRightActionsEnabled}
                            onTaskEdit={onTaskEdit}
                            onTaskDelete={onTaskDelete}
                            onDrop={onDrop}
                            onTaskComplete={onTaskComplete}
                            onTaskClick={onTaskClick}
                        />
                    ) : null
                )}
            {tasks && tasks.length === 0 && <NoTask />}
            <DragPreview />
        </div>
    );
}

TaskListManager.propTypes = {
    tasks: PropTypes.array,
    isDraggable: PropTypes.bool,
    isRightActionsEnabled: PropTypes.bool,
    showCompletedTasks: PropTypes.bool,
    onTaskEdit: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired
}

export default TaskListManager;