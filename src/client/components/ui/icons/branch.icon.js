import React from 'react';
import PropTypes from 'prop-types';

function BranchIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-code-branch clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

BranchIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

BranchIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default BranchIcon;