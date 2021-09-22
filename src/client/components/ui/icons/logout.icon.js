import React from 'react';
import PropTypes from 'prop-types';

function LogoutIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-sign-out-alt clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

LogoutIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

LogoutIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default LogoutIcon;