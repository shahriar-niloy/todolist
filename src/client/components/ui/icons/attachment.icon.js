import React from 'react';
import PropTypes from 'prop-types';

function AttachmentIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-paperclip clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

AttachmentIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

AttachmentIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default AttachmentIcon;