import React from 'react';
import LaunchGraphic from '../graphic/launch.graphic';

export default function NoTask() {
    return <div className="notask">
        <LaunchGraphic className="notask-img" />
        <h5>No pending tasks</h5>
        <h6>Add a new task to get started</h6>
    </div>
}