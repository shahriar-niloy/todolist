import React from 'react';
import PropTypes from 'prop-types';

function GripIcon({ className, onClick }) {
    return <i class={`fas fa-grip-vertical ${className || ''}`} onClick={onClick} ></i>
}

GripIcon.proptType = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default GripIcon;