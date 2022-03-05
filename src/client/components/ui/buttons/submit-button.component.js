import React from 'react';
import Proptypes from 'prop-types';

function SubmitButton({ className, extendedClass, style, label, disabled, children, onClick }) {
    return <span style={style} className={`${className} ${extendedClass} ${disabled ? 'disabled': ''}`} onClick={onClick} >{children ? children : label}</span>
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

