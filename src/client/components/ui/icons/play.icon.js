import React from 'react';
import PropTypes from 'prop-types';

function PlayIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-play-circle clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

PlayIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

PlayIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default PlayIcon;