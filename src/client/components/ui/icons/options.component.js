import React from 'react';
import PropTypes from 'prop-types';

function OptionIcon({ className, onClick }) {
    return <i 
        class={`fal fa-ellipsis-h-alt clickable font-size-24 ${className || ''}`} 
        onClick={onClick} 
    />
}

OptionIcon.proptType = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default OptionIcon;