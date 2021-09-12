import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import ProjectFormContainer from './project/project-form.container';
import Sidebar from './sidebar.container';

function ToDoManager() {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const currentUser = useSelector(state => state.user.profile);

    return <div>
        <Navbar initials="AN" />
        <Sidebar 
            onProjectAddClick={() => setShowProjectForm(true)} 
            projects={currentUser.projects || []}
        />
        <Modal isOpen={showProjectForm} onRequestClose={() => setShowProjectForm(false)} >
            <ProjectFormContainer onClose={() => setShowProjectForm(false)} />
        </Modal>
    </div>
}

export default ToDoManager;