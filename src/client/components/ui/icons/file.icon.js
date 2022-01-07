import React from 'react';
import PropTypes from 'prop-types';

function FileIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-file-alt clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

FileIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

FileIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default FileIcon;