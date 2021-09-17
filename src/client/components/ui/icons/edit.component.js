import React from 'react';
import PropTypes from 'prop-types';

function EditIcon({ className, onClick }) {
    return <i class={`fas fa-pencil-alt ${className || ''}`} onClick={onClick} ></i>
}

EditIcon.proptType = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default EditIcon;