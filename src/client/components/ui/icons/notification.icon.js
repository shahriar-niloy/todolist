import React from 'react';
import PropTypes from 'prop-types';

function NotificationIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fad fa-bell clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

NotificationIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

NotificationIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default NotificationIcon;