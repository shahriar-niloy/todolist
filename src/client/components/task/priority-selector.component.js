import React from 'react';
import PropTypes from 'prop-types';
import priorityLevels from '../../constants/priority-levels.constants';
import PriorityLevelIcon from '../ui/icons/priority-level.icon';
import TickIcon from '../ui/icons/tick.icon';

function PrioritySelector({ priority, hidePopover, onSelect }) {
    return <ul>
        {
            Object.keys(priorityLevels).map(key => 
                <li className="d-flex align-y" key={key} onClick={() => { onSelect(priorityLevels[key].value); hidePopover(); }} >
                    <PriorityLevelIcon className="task-priority-selector-flag-icon" level={key} fontSize={13} />
                    {priorityLevels[key].label}
                    {priority === key && <TickIcon className="task-priority-selector-tick-icon" fontSize={13} />}
                </li>
            )
        }
    </ul>
}   

PrioritySelector.propTypes = {
    priority: PropTypes.string,
    hidePopover: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default PrioritySelector;