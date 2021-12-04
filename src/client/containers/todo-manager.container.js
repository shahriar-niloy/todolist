import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import BaseEditor from '../components/editor/base-editor.component';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import ManagerHome from '../components/states/manager-home.component';
import { getInitials } from '../utility';
import ProjectFormContainer from './project/project-form.container';
import Sidebar from './sidebar.container';
import TaskEditorContainer from './task/task-editor.container';
import TodayTaskEditor from './task/today-task-editor.container';

function ToDoManager() {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [selectedProjectID, setSelectedProjectID] = useState(null);
    const currentUser = useSelector(state => state.user.profile);

    const initials = getInitials(currentUser 
        ? `${currentUser?.first_name} ${currentUser?.last_name}` 
        : ''
    );

    const handleClose = () => { 
        setShowProjectForm(false); 
        setSelectedProjectID(null);
    };

    return <div className="todo-body">
        <Navbar initials={initials} />
        <div className="todo-main">
            <Sidebar 
                projects={currentUser?.projects || []}
                onProjectAddClick={() => setShowProjectForm(true)}
                onProjectEditClick={id => {
                    setShowProjectForm(true);
                    setSelectedProjectID(id);
                }} 
            />
            <Switch>
                <Route path="/projects/:id"><BaseEditor><TaskEditorContainer /></BaseEditor></Route>
                <Route path="/today"><BaseEditor><TodayTaskEditor /></BaseEditor></Route>
                <Route path=""><ManagerHome /></Route>
            </Switch>
        </div>
        <Modal isOpen={showProjectForm} onRequestClose={handleClose} >
            <ProjectFormContainer projectID={selectedProjectID} onClose={handleClose} />
        </Modal>
    </div>
}

export default ToDoManager;