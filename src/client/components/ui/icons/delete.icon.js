import React from 'react';
import PropTypes from 'prop-types';

function DeleteIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fas fa-trash clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

DeleteIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

DeleteIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default DeleteIcon;