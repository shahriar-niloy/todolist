import React from 'react';
import PropTypes from 'prop-types';

function PauseIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-pause-circle clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

PauseIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

PauseIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default PauseIcon;