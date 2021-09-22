import React from 'react';
import PropTypes from 'prop-types';

function DeleteIcon({ className, onClick }) {
    return <i class={`fas fa-trash ${className || ''}`} onClick={onClick} ></i>
}

DeleteIcon.proptType = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default DeleteIcon;