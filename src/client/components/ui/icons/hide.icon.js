import React from 'react';
import PropTypes from 'prop-types';

function HideIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-ban clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

HideIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

HideIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default HideIcon;