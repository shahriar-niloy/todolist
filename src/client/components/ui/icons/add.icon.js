import React from 'react';
import PropTypes from 'prop-types';

function AddIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-plus clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

AddIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

AddIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default AddIcon;