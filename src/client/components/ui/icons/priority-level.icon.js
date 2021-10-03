import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    'NONE': {},
    'HIGH': {
        fontWeight: '700',
        color: 'rgb(255, 112, 102)'
    },
    'MEDIUM': {
        fontWeight: '700',
        color: 'rgb(255, 154, 20)'
    },
    'LOW': {
        fontWeight: '700',
        color: 'rgb(82, 151, 255)'
    }
}

function PriorityLevelIcon({ className, fontSize, level, onClick }) {
    return <i class={`fal fa-flag-alt font-size-${fontSize} ${className || ''}`} style={styles[level]} onClick={onClick} />
}

PriorityLevelIcon.defaultProps = {
    fontSize: '18',
    level: 1,
    onclick: () => null
};

PriorityLevelIcon.proptType = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string,
    level: PropTypes.number
};

export default PriorityLevelIcon;