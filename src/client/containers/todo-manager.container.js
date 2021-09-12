import React, { useState } from 'react';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import ProjectFormContainer from './project/project-form.container';
import Sidebar from './sidebar.container';

function ToDoManager() {
    const [showProjectForm, setShowProjectForm] = useState(false);

    return <div>
        <Navbar initials="AN" />
        <Sidebar onProjectAddClick={() => setShowProjectForm(true)} />
        <Modal isOpen={showProjectForm} onRequestClose={() => setShowProjectForm(false)} >
            <ProjectFormContainer onClose={() => setShowProjectForm(false)} />
        </Modal>
    </div>
}

export default ToDoManager;