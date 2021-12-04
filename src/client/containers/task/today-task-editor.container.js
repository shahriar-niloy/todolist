import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskEditor from '../../components/editor/task-editor.component';
import Modal from '../../components/modal';
import { getTodayTasksAction, getToggleTaskCompletedAction } from '../../store/actions/task.action';
import TaskFormContainer from './task-form.container';

const taskFormModalStyle = {
    content: {
      minWidth: '700px'
    }
};

function TodayTaskEditorContainer() {
    const dispatch = useDispatch();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskID, setTaskID] = useState(null);
    const [openTaskFormInDetailView, setOpenTaskFormInDetailView] = useState(false);
    
    const { 
        flat: taskList,  
        taskToSubtask, 
    } = useSelector(state => state.task.list);

    const handleTaskComplete = (taskID, isCurrentlyComplete, onSuccess) => {
        const taskDetails = taskList.find(task => task.id === taskID);
        dispatch(
            getToggleTaskCompletedAction(taskID, taskDetails.project_id, !isCurrentlyComplete, () => {
                getTodayTasks();
                onSuccess && onSuccess();
            })
        );
    }

    const handleTaskClick = id => {
        setTaskID(id);
        setShowTaskForm(true);
        setOpenTaskFormInDetailView(true);
    }

    const handleTaskFormClose = () => {
        setTaskID(null);
        setOpenTaskFormInDetailView(false);
        setShowTaskForm(false);
    }

    const handleNavigateToParentTask = taskID => setTaskID(taskID);

    const getTodayTasks = () => dispatch(getTodayTasksAction());

    useEffect(() => {
        getTodayTasks();
    }, []);

    return <>
        <TaskEditor 
            title="Today"
            tasks={[...(taskList||[])]}
            showCompletedTasks={true}
            isDraggable={false}
            isRightActionsEnabled={false}
            isDetailView={openTaskFormInDetailView} 
            onTaskComplete={handleTaskComplete}
            onTaskClick={handleTaskClick}
        />
        <Modal isOpen={showTaskForm} onRequestClose={handleTaskFormClose} style={taskFormModalStyle} >
            <TaskFormContainer 
                projectID={taskList?.find(task => task.id === taskID)?.project_id}
                taskID={taskID}
                subtasks={taskID ? taskToSubtask?.get(taskID) : []}
                isDetailView={true}
                isEditDisabled={true}
                createAtOrder={0} 
                onTaskComplete={handleTaskComplete}
                onTaskClick={handleTaskClick}
                onNavigateToParentTask={handleNavigateToParentTask}
            />
        </Modal>
    </>
}

export default TodayTaskEditorContainer;