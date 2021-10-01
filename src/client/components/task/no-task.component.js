import React from 'react';
import RocketIcon from '../ui/icons/rocket.icon';

export default function NoTask() {
    return <div className="notask">
        <RocketIcon className="launch-icon" fontSize={70} />
        <h5>No pending tasks!</h5>
        <h6>Add a new task to get started.</h6>
    </div>
}