import React from 'react';
import PropTypes from 'prop-types';

function CheckSquareIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-check-square clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

CheckSquareIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

CheckSquareIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default CheckSquareIcon;