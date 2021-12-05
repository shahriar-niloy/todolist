import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd'

import EditIcon from '../ui/icons/edit.component';
import DeleteIcon from '../ui/icons/delete.icon';
import GripIcon from '../ui/icons/grip.component';
import dragItemTypes from '../../constants/drag-item.types';
import Checkbox from '../ui/icons/checkbox.component';
import ArrowRightIcon from '../ui/icons/arrow-right.icon';
import DROP_HIGHLIGHT_DRAWERS from '../../constants/taskitem-drop-highlight.constant';

function TaskListItem ({ 
    task, 
    tasks, 
    showCompletedTasks, 
    isDraggable, 
    isDropDisabled, 
    isRightActionsEnabled,
    onTaskDelete, 
    onTaskEdit, 
    onDrop, 
    onTaskComplete, 
    onTaskClick 
}) {
    const [showSubtasks, setShowSubtasks] = useState(false);
    const containerRef = useRef();
    const [containerWidth, setContainerWidth] = useState();
    const [containerHeight, setContainerHeight] = useState();
    const [openedDropHighlightDrawer, setOpenedDropHighlightDrawer] = useState(null);
    const [dragItemContainerHeight, setDragItemContainerHeight] = useState(0);
    const adjustSlideDownHeight = -10;
    const hasSubtasks = task?.subtasks?.length;

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: dragItemTypes.TASK,
            item: {
                id: task.id,
                name: task.name,
                description: task.description,
                previewWidth: containerWidth,
                previewHeight: containerHeight
            },
            collect: monitor => {
                return {
                    isDragging: !!monitor.isDragging(),
                    getClientOffset: monitor.getClientOffset()
                }
            }
        }),
        [containerWidth, containerHeight, task, dragItemTypes]
    );

    const [dropProps, drop] = useDrop(
        () => ({
            accept: dragItemTypes.TASK,
            drop: source => !isDropDisabled && !task.is_completed 
                ? onDrop(source.id, task.id, openedDropHighlightDrawer)
                : undefined,
            collect: monitor => { 
                return ({ 
                    isOver: monitor.isOver(),
                    getClientOffset: monitor.getClientOffset()
                })
            },
            hover: (item, monitor) => {
                if (item.id === task.id) return;

                let { x: pointerX, y: pointerY } = monitor.getClientOffset();
                const { left: posFromLeft, top: posFromTop } = containerRef.current?.getBoundingClientRect();
                const containerWidth = containerRef?.current?.clientWidth;
                const containerHeight = containerRef?.current?.clientHeight;
                let middlePointOnY = posFromTop + (containerHeight / 2.0) ;
                const isOver = monitor.isOver();
                const positionAboveScroll = document.querySelector('.editor-main').scrollTop;
                const adjustMiddlePointYBy = -(containerHeight*0.05);
                const subtaskDropHighlightPadLeftFactor = 0.1;
                const subtaskDropHighlightLeftPad = posFromLeft + (containerWidth * subtaskDropHighlightPadLeftFactor);

                pointerY += positionAboveScroll;
                middlePointOnY += adjustMiddlePointYBy;

                if (pointerY < middlePointOnY) {
                    setOpenedDropHighlightDrawer(DROP_HIGHLIGHT_DRAWERS.TOP);
                } else {
                    if (pointerX > subtaskDropHighlightLeftPad) {
                        setOpenedDropHighlightDrawer(DROP_HIGHLIGHT_DRAWERS.SUBTASK);
                    } else {
                        setOpenedDropHighlightDrawer(DROP_HIGHLIGHT_DRAWERS.BOTTOM);
                    }
                }

                setDragItemContainerHeight(isOver ? item.previewHeight : null);
            }
        }),
        [task, onDrop, containerRef.current, openedDropHighlightDrawer, isDropDisabled]
    );

    useEffect(() => {
        setContainerWidth(
            containerRef?.current?.clientWidth 
                ? containerRef?.current?.clientWidth
                : ''
        );
        setContainerHeight(
            containerRef?.current?.clientHeight 
                ? containerRef?.current?.clientHeight
                : ''
        );
    }, [containerRef.current]);

    useEffect(() => {
        if (isDragging && showSubtasks) setShowSubtasks(false);
        if (isDragging && !dropProps.isOver) setOpenedDropHighlightDrawer(null);
    }, [isDragging, dropProps]);

    return <div>
        <div ref={containerRef} >
            <div ref={drop} className={hasSubtasks ? "list-item-container-wide" : "list-item-container"}>
                {!isDropDisabled && !task.is_completed && <div style={dropProps.isOver && openedDropHighlightDrawer === DROP_HIGHLIGHT_DRAWERS.TOP ? { height: dragItemContainerHeight + adjustSlideDownHeight } : { height: '0px' }} className={`drop-extendable ${dropProps.isOver && openedDropHighlightDrawer === DROP_HIGHLIGHT_DRAWERS.TOP  ? `drop-highlight${hasSubtasks ? '-wide' : ''}` : ''}`} ></div>}
                <div className={`list-item ${task.is_completed ? 'completed' : ''}`} >
                    <div className="left-actions">
                        <GripIcon className={`me-2 active-on-hover ${!isDraggable || task.is_completed ? 'click-disabled invisible' : ''}`} fontSize="16" innerRef={drag} />
                        { task.subtasks && task.subtasks.length > 0 && 
                            <ArrowRightIcon 
                                className="me-2 active-on-hover" 
                                fontSize="19" 
                                onClick={() => setShowSubtasks(!showSubtasks)}
                            /> 
                        }
                    </div>
                    <Checkbox checked={task.is_completed} onClick={() => onTaskComplete(task.id, task.is_completed)} />
                    <div className="flex-grow-1 task-title-desc">
                        <div className="d-flex justify-content-between">
                            <h5 onClick={() => onTaskClick(task.id)}>{task.name}</h5>
                            {isRightActionsEnabled && <div className="right-actions">
                                {!task.is_completed && <EditIcon className="font-size-16 me-2 clickable active-on-hover" onClick={() => onTaskEdit(task.id)} />}
                                <DeleteIcon className="font-size-16 clickable active-on-hover" onClick={() => onTaskDelete(task.id)} />
                            </div>}
                        </div>
                        <div className="description" onClick={() => onTaskClick(task.id)} >{task.description}</div>
                    </div>
                </div>
                {!showSubtasks && !isDropDisabled && !task.is_completed && <div style={dropProps.isOver && openedDropHighlightDrawer === DROP_HIGHLIGHT_DRAWERS.BOTTOM ? { height: dragItemContainerHeight + adjustSlideDownHeight } : { height: '0px' }} className={`drop-extendable ${dropProps.isOver && openedDropHighlightDrawer === DROP_HIGHLIGHT_DRAWERS.BOTTOM  ? `drop-highlight${hasSubtasks ? '-wide' : ''}` : ''}`} ></div>}
                {!showSubtasks && !isDropDisabled && !task.is_completed && <div className="d-flex">
                    <div className="subtask-drawer-pad"></div>
                    <div style={dropProps.isOver && openedDropHighlightDrawer === DROP_HIGHLIGHT_DRAWERS.SUBTASK ? { height: dragItemContainerHeight + adjustSlideDownHeight } : { height: '0px' }} className={`drop-extendable subtask-drawer ${dropProps.isOver && openedDropHighlightDrawer === DROP_HIGHLIGHT_DRAWERS.SUBTASK  ? `drop-highlight${hasSubtasks ? '-wide' : ''}` : ''}`} ></div>
                </div>}
            </div>
            <hr></hr>
        </div>
        {
            showSubtasks && task.subtasks && <div className="ms-4">
                {
                    task.subtasks.filter(st => showCompletedTasks || !st.is_completed).map(subtask => <TaskListItem 
                        key={subtask.id}
                        task={subtask}
                        tasks={tasks}
                        showCompletedTasks={showCompletedTasks}
                        isDropDisabled={task.is_completed || isDropDisabled}
                        isDraggable={isDraggable}
                        onTaskDelete={onTaskDelete}
                        onTaskEdit={onTaskEdit}
                        onTaskClick={onTaskClick}
                        onDrop={onDrop}
                        onTaskComplete={onTaskComplete}
                    />)
                }
            </div>
        }
    </div>
}

TaskListItem.defaultProps = {
    isDropDisabled: false
}

TaskListItem.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    task: PropTypes.object.isRequired,
    showCompletedTasks: PropTypes.bool.isRequired,
    isDraggable: PropTypes.bool,
    isRightActionsEnabled: PropTypes.bool,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onTaskComplete: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired
}

export default TaskListItem;