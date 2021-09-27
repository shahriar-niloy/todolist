import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd'
import EditIcon from '../ui/icons/edit.component';
import DeleteIcon from '../ui/icons/delete.icon';
import GripIcon from '../ui/icons/grip.component';
import dragItemTypes from '../../constants/drag-item.types';
import Checkbox from '../ui/icons/checkbox.component';
import OptionIcon from '../ui/icons/options.component';
import Popover from '../lib/popover';
import NoTask from '../task/no-task.component';
import ArrowRightIcon from '../ui/icons/arrow-right.icon';
import DragPreview from '../dragpreview/drag-preview.component';

function TaskListItem ({ task, tasks, showCompletedTasks, onTaskDelete, onTaskEdit, onDrop, onTaskComplete }) {
    const [showSubtasks, setShowSubtasks] = useState(false);
    const containerRef = useRef();
    const [containerWidth, setContainerWidth] = useState();

    const [dragProps, drag] = useDrag(
        () => ({
            type: dragItemTypes.TASK,
            item: {
                id: task.id,
                name: task.name,
                description: task.description,
                previewWidth: containerWidth
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [containerWidth, task, dragItemTypes]
    );

    const [dropProps, drop] = useDrop(
        () => ({
          accept: dragItemTypes.TASK,
          drop: source => onDrop(source.id, task.id),
          collect: monitor => ({ isOver: monitor.isOver() })
        }),
        [task, onDrop]
    );

    const [dropSliderProps, dropSlider] = useDrop(
        () => ({
          accept: dragItemTypes.TASK,
          drop: source => onDrop(source.id, task.id),
          collect: monitor => ({ isOver: monitor.isOver() })
        }),
        [task, onDrop]
    );

    useEffect(() => {
        setContainerWidth(
            containerRef?.current?.clientWidth 
                ? containerRef?.current?.clientWidth + 'px'
                : ''
            );
    }, [containerRef.current])

    return <div ref={containerRef}>
        <div className={dropProps.isOver || dropSliderProps.isOver  ? 'slide-down' : ''} ref={dropSlider} ></div>
        <div className={`list-item ${task.is_completed ? 'completed' : ''} ${dropProps.isOver || dropSliderProps.isOver ? 'drop-highlight' : ''}`} ref={drop} >
            <div className={task?.subtasks?.length ? 'left-actions-wide' : 'left-actions'}>
                <GripIcon className="me-2 active-on-hover" fontSize="16" innerRef={drag} />
                { task.subtasks && task.subtasks.length > 0 && 
                    <ArrowRightIcon 
                        className="me-2 active-on-hover" 
                        fontSize="19" 
                        onClick={() => setShowSubtasks(!showSubtasks)}
                    /> 
                }
            </div>
            <Checkbox checked={task.is_completed} onClick={() => onTaskComplete(task.id, task.is_completed)} />
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                    <h5>{task.name}</h5>
                    <div className="right-actions">
                        <EditIcon className="font-size-16 me-2 clickable active-on-hover" onClick={() => onTaskEdit(task.id)} />
                        <DeleteIcon className="font-size-16 clickable active-on-hover" onClick={() => onTaskDelete(task.id)} />
                    </div>
                </div>
                <div className="description">{task.description}</div>
            </div>
        </div>
        <hr></hr>
        {
            showSubtasks && task.subtasks && <div className="ms-4">
                {
                    task.subtasks.filter(st => showCompletedTasks || !st.is_completed).map(subtask => <TaskListItem 
                        key={subtask.id}
                        task={subtask}
                        tasks={tasks}
                        showCompletedTasks={showCompletedTasks}
                        onTaskDelete={onTaskDelete}
                        onTaskEdit={onTaskEdit}
                        onDrop={onDrop}
                        onTaskComplete={onTaskComplete}
                    />)
                }
            </div>
        }
    </div>
}

function TaskEditor({ projectName, tasks, showCompletedTasks, onTaskAddIconClick, onTaskDelete, onTaskEdit, onDrop, onTaskComplete, ProjectMenu }) {
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
        <div>
            {
                tasks && tasks.map(task => showCompletedTasks || !task.is_completed 
                    ? <TaskListItem 
                        key={task.id}
                        tasks={tasks}
                        task={task} 
                        showCompletedTasks={showCompletedTasks}
                        onTaskEdit={onTaskEdit} 
                        onTaskDelete={onTaskDelete} 
                        onDrop={onDrop}
                        onTaskComplete={onTaskComplete}
                    /> 
                    : null
                )
            }
            {
                tasks && tasks.length === 0 && <NoTask />
            }
            <DragPreview />
        </div>
    </div>
}

TaskEditor.defaultProps = {
    tasks: []
}

TaskListItem.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    task: PropTypes.object.isRequired,
    showCompletedTasks: PropTypes.bool.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired
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
    ProjectMenu: PropTypes.func.isRequired
}

export default TaskEditor;