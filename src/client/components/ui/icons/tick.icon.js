import React from 'react';
import PropTypes from 'prop-types';

function TickIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-check clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

TickIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

TickIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default TickIcon;