import React from 'react';
import PropTypes from 'prop-types';

function RocketIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-rocket-launch clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

RocketIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

RocketIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default RocketIcon;