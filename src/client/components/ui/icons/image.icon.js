import React from 'react';
import PropTypes from 'prop-types';

function ImageIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-images clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

ImageIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

ImageIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default ImageIcon;