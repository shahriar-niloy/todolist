import React from 'react';
import PropTypes from 'prop-types';

function CheckCircleIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-check-circle clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

CheckCircleIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

CheckCircleIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default CheckCircleIcon;