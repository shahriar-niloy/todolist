import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '../ui/icons/edit.component';
import DeleteIcon from '../ui/icons/delete.component';
import GripIcon from '../ui/icons/grip.component';

function TaskEditor({ projectName, tasks, onTaskAddIconClick, onTaskDelete, onTaskEdit }) {
    return <div className="task-editor">
        <div className="d-flex justify-content-between align-items-center">
            <h4>{projectName}</h4>
            <i class="fas fa-plus font-size-16 clickable" onClick={onTaskAddIconClick} ></i>
        </div>
        <hr></hr>
        <div>
            {
                tasks && tasks.map(task => <React.Fragment key={task.id} >
                    <div>
                        <div className="d-flex">
                            <GripIcon className="me-3 font-size-16 clickable" />
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
                    </div>
                    <hr></hr>
                </React.Fragment>)
            }
        </div>
        <div></div>
    </div>
}

TaskEditor.propTypes = {
    projectName: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    onTaskAddIconClick: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired
}

export default TaskEditor;