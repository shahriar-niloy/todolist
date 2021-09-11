import React, { useState } from 'react';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import Sidebar from './sidebar.container';


function ToDoManager() {
    const [showProjectForm, setShowProjectForm] = useState(false);

    return <div>
        <Navbar initials="AN" />
        <Sidebar onProjectAddClick={() => setShowProjectForm(true)} />
        <Modal isOpen={showProjectForm} onRequestClose={() => setShowProjectForm(false)} >
            <div>This is a modal</div>
        </Modal>
    </div>
}

export default ToDoManager;