import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BaseEditor from '../components/editor/base-editor.component';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import ProjectFormContainer from './project/project-form.container';
import Sidebar from './sidebar.container';
import TaskContainer from './task/task.container';

function ToDoManager() {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [selectedProjectID, setSelectedProjectID] = useState(null);
    const currentUser = useSelector(state => state.user.profile);

    const handleClose = () => { 
        setShowProjectForm(false); 
        setSelectedProjectID(null);
    };

    return <div className="todo-body">
        <Navbar initials="AN" />
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
                <Route path="/projects/:id" exact ><BaseEditor><TaskContainer /></BaseEditor></Route>
            </Switch>
        </div>
        <Modal isOpen={showProjectForm} onRequestClose={handleClose} >
            <ProjectFormContainer projectID={selectedProjectID} onClose={handleClose} />
        </Modal>
    </div>
}

export default ToDoManager;