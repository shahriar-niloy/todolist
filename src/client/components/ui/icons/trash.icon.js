import React from 'react';
import PropTypes from 'prop-types';

function TrashIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-trash-alt clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

TrashIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

TrashIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default TrashIcon;