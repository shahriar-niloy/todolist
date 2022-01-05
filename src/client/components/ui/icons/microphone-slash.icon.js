import React from 'react';
import PropTypes from 'prop-types';

function MicrophoneSlashIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-microphone-slash clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

MicrophoneSlashIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

MicrophoneSlashIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default MicrophoneSlashIcon;