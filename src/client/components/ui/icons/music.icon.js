import React from 'react';
import PropTypes from 'prop-types';

function MusicIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-music clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

MusicIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

MusicIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default MusicIcon;