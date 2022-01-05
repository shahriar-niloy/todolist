import React from 'react';
import PropTypes from 'prop-types';

function MicrophoneIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-microphone clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

MicrophoneIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

MicrophoneIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default MicrophoneIcon;