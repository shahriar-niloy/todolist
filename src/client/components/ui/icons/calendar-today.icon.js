import React from 'react';
import PropTypes from 'prop-types';

function CalendarTodayIcon({ className, fontSize, onClick }) {
    return <i 
        class={`fal fa-calendar-day clickable font-size-${fontSize} ${className || ''}`} 
        onClick={onClick} 
    />
}

CalendarTodayIcon.defaultProps = {
    fontSize: '18',
    onclick: () => null
};

CalendarTodayIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string
};

export default CalendarTodayIcon;