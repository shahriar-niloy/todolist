import React from 'react';
import PropTypes from 'prop-types';

function SaveIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fas fa-save clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

SaveIcon.defaultProps = {
    fontSize: '18',
    onClick: () => null
};

SaveIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default SaveIcon;