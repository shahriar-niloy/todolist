import React from 'react';
import PropTypes from 'prop-types';

function ArchiveIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-archive clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

ArchiveIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

ArchiveIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default ArchiveIcon;