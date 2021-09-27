import React from 'react';
import PropTypes from 'prop-types';

function ArrowRightIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-angle-right clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

ArrowRightIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

ArrowRightIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default ArrowRightIcon;