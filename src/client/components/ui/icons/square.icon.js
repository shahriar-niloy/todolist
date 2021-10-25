import React from 'react';
import PropTypes from 'prop-types';

function SquareIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-stop clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

SquareIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

SquareIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default SquareIcon;