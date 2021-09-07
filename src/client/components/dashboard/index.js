import React from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';

export default function Dashboard () {
    return <div>
        <Navbar initials="AN" />
        <Sidebar menuItems={[{ name: 'Home', path: '/api' }]} />
        <div></div>
    </div>
}