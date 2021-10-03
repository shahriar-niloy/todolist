import React from 'react';
import PropTypes from 'prop-types';

function CalendarIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-calendar-alt clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

CalendarIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

CalendarIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default CalendarIcon;