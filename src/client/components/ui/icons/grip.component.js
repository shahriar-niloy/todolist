import React from 'react';
import PropTypes from 'prop-types';

function GripIcon({ className, fontSize, innerRef, onClick }) {
    return <i 
        ref={innerRef}
        class={`fas fa-grip-vertical clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

GripIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

GripIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default GripIcon;