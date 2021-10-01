import React from 'react';
import Checkbox from '../ui/icons/checkbox.component';

function TaskDragPreview ({ task }) {
    return <>
        <div className="list-item drop-highlight" style={{ width: task.previewWidth || '300px'  }}>
            <Checkbox />
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                    <h5>{task.name}</h5>
                </div>
                <div>{task.description}</div>
            </div>
        </div>
    </>
}

export default TaskDragPreview;