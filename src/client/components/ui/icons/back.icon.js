import React from 'react';
import PropTypes from 'prop-types';

function BackIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fas fa-angle-left clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

BackIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

BackIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default BackIcon;