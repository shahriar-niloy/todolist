import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import HideIcon from '../../components/ui/icons/hide.icon';

function TaskScheduler({ date, hidePopover, onDateChange }) {
    const handleDateChange = date => {
        onDateChange(date);
        hidePopover();
    }

    return <div className="task-scheduler">
        <div>
            <div className="d-flex align-y task-scheduler-actions-menuitem" onClick={() => handleDateChange(null)}>
                <HideIcon />
                <span>No Date</span>
            </div>
        </div>
        <hr />
        <DatePicker 
            selected={date && new Date(date) || null} 
            inline
            onChange={handleDateChange} 
            minDate={new Date()}
        />
    </div>
}

TaskScheduler.propTypes = {
    date: PropTypes.string,
    hidePopover: PropTypes.func,
    onDateChange: PropTypes.func.isRequired
}

export default TaskScheduler;