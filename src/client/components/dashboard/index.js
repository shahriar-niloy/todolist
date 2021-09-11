import React from 'react';
import Sidebar from '../../containers/sidebar.container';
import Navbar from '../navbar';


export default function Dashboard () {
    return <div>
        <Navbar initials="AN" />
        <Sidebar />
        <div></div>
    </div>
}