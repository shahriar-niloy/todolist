import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ label, extendedClass, name, checked, onClick, disabled }) {
    return <label className={`checkbox-wrapper ${disabled ? 'disabled' : ''}`}>
        {label}
        <input type="checkbox" name={name} checked={checked} onClick={onClick} />
        <span className={`checkmark ${extendedClass} ${disabled ? 'checkmark-disabled' : ''}`}></span>
    </label>
};

Checkbox.defaultProps = {
    onclick: () => null,
    label: '',
    name: '',
    disabled: false,
    extendedClass: ''
}

Checkbox.proptType = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    checked: PropTypes.string,
    extendedClass: PropTypes.string
}

export default Checkbox;