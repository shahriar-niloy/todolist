import React from 'react';
import Proptypes from 'prop-types';

function SubmitButton({ className, extendedClass, label, disabled, onClick }) {
    return <span className={`${className} ${extendedClass} ${disabled ? 'disabled': ''}`} onClick={onClick} >{label}</span>
}

SubmitButton.defaultProps = {
    label: 'Submit',
    className: 'btn btn-submit clickable',
    extendedClass: '',
    disabled: false,
    onClick: () => null
}

SubmitButton.propTypes = {
    label: Proptypes.string,
    onClick: Proptypes.func,
    disabled: Proptypes.bool,
    className: Proptypes.string,
    extendedClass: Proptypes.string
}

export default SubmitButton;

