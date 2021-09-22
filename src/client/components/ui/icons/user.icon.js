import React from 'react';
import PropTypes from 'prop-types';

function UserIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-user-circle clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

UserIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

UserIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default UserIcon;