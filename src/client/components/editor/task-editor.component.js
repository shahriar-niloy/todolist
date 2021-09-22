import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd'
import EditIcon from '../ui/icons/edit.component';
import DeleteIcon from '../ui/icons/delete.component';
import GripIcon from '../ui/icons/grip.component';
import dragItemTypes from '../../constants/drag-item.types';
import Checkbox from '../ui/icons/checkbox.component';
import OptionIcon from '../ui/icons/options.component';

function TaskListItem ({ task, onTaskDelete, onTaskEdit, onDrop, onTaskComplete }) {
    const [dragProps, drag] = useDrag(() => ({
        type: dragItemTypes.TASK,
        item: { id: task.id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const [dropProps, drop] = useDrop(
        () => ({
          accept: dragItemTypes.TASK,
          drop: source => onDrop(source.id, task.id),
          collect: monitor => ({ isOver: monitor.isOver() })
        }),
        [task, onDrop]
    );

    return <React.Fragment>
        <div className={`list-item ${dropProps.isOver ? 'drop-highlight' : ''}`} ref={drop} >
            <GripIcon className="me-2 clickable gripicon" innerRef={drag} />
            <Checkbox checked={task.is_completed} onClick={() => onTaskComplete(task.id, task.is_completed)} />
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                    <h5>{task.name}</h5>
                    <div>
                        <EditIcon className="font-size-16 me-3 clickable" onClick={() => onTaskEdit(task.id)} />
                        <DeleteIcon className="font-size-16 clickable" onClick={() => onTaskDelete(task.id)} />
                    </div>
                </div>
                <div>{task.description}</div>
            </div>
        </div>
        <hr></hr>
    </React.Fragment>
}

function TaskEditor({ projectName, tasks, onTaskAddIconClick, onTaskDelete, onTaskEdit, onDrop, onTaskComplete }) {
    return <div className="task-editor">
        <div className="d-flex justify-content-between align-items-center">
            <h4>{projectName}</h4>
            <div className="align-xy">
                <i class="fal fa-plus font-size-21 clickable me-3" onClick={onTaskAddIconClick} ></i>
                <OptionIcon />
            </div>
        </div>
        <hr></hr>
        <div>
            {
                tasks && tasks.map(task => <TaskListItem 
                    key={task.id}
                    task={task} 
                    onTaskEdit={onTaskEdit} 
                    onTaskDelete={onTaskDelete} 
                    onDrop={onDrop}
                    onTaskComplete={onTaskComplete}
                />)
            }
        </div>
        <div></div>
    </div>
}

TaskListItem.propTypes = {
    task: PropTypes.object.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired
}

TaskEditor.propTypes = {
    projectName: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    onTaskAddIconClick: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired
}

export default TaskEditor;