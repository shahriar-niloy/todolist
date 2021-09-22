import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ label, name, checked, onClick }) {
    return <label class="checkbox-wrapper">
        {label}
        <input type="checkbox" name={name} checked={checked} onClick={onClick} />
        <span className="checkmark"></span>
    </label>
};

Checkbox.defaultProps = {
    onclick: () => null,
    label: '',
    name: ''
}

Checkbox.proptType = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    checked: PropTypes.string
}

export default Checkbox;