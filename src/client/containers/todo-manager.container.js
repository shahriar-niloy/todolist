import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import BaseEditor from '../components/editor/base-editor.component';
import Modal from '../components/modal';
import ManagerHome from '../components/states/manager-home.component';
import ProjectFormContainer from './project/project-form.container';
import ProjectShareFormContainer from './project/project-share-form.container';
import Sidebar from './sidebar.container';
import TaskEditorContainer from './task/task-editor.container';
import TodayTaskEditor from './task/today-task-editor.container';
import NavbarContainer from './navbar.container';
import SettingsContainer from './app/settings/settings.container';

function ToDoManager() {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showProjectShareForm, setShowProjectShareForm] = useState(false);
    const [selectedProjectID, setSelectedProjectID] = useState(null);
    const currentUser = useSelector(state => state.user.profile);
    const history = useHistory();

    const handleClose = () => { 
        setShowProjectForm(false); 
        setShowProjectShareForm(false); 
        setSelectedProjectID(null);
    };

    return <div className="todo-body">
        <NavbarContainer />
        <div className="todo-main">
            <Sidebar 
                projects={currentUser?.projects || []}
                onProjectAddClick={() => setShowProjectForm(true)}
                onProjectEditClick={id => {
                    setShowProjectForm(true);
                    setSelectedProjectID(id);
                }} 
                onProjectShareClick={id => {
                    setShowProjectShareForm(true);
                    setSelectedProjectID(id);
                }}
                onProjectOpenClick={projectID => history.push(`/projects/${projectID}`)}
            />
            <Switch>
                <Route path="/projects/:id"><BaseEditor><TaskEditorContainer /></BaseEditor></Route>
                <Route path="/today"><BaseEditor><TodayTaskEditor /></BaseEditor></Route>
                <Route path="/settings"><BaseEditor><SettingsContainer /></BaseEditor></Route>
                <Route path=""><ManagerHome /></Route>
            </Switch>
        </div>
        <Modal isOpen={showProjectForm} onRequestClose={handleClose} >
            <ProjectFormContainer projectID={selectedProjectID} onClose={handleClose} />
        </Modal>
        <Modal isOpen={showProjectShareForm} onRequestClose={handleClose} >
            <ProjectShareFormContainer projectID={selectedProjectID} onClose={handleClose} />
        </Modal>
    </div>
}

export default ToDoManager;