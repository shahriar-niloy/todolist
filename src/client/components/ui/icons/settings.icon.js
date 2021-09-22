import React from 'react';
import PropTypes from 'prop-types';

function SettingsIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-cog clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

SettingsIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

SettingsIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default SettingsIcon;