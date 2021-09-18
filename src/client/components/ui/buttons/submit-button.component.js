import React from 'react';
import Proptypes from 'prop-types';

function SubmitButton({ className, extendedClass, label, onClick }) {
    return <span className={`${className} ${extendedClass}`} onClick={onClick} >{label}</span>
}

SubmitButton.defaultProps = {
    label: 'Submit',
    className: 'btn btn-submit clickable',
    extendedClass: '',
    onClick: () => null
}

SubmitButton.propTypes = {
    label: Proptypes.string,
    onClick: Proptypes.func,
    className: Proptypes.string,
    extendedClass: Proptypes.string
}

export default SubmitButton;

