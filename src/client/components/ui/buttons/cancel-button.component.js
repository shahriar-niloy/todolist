import React from 'react';
import Proptypes from 'prop-types';

function CancelButton({ className, extendedClass, label, onClick }) {
    return <span className={`${className} ${extendedClass}`} onClick={onClick} >{label}</span>
}

CancelButton.defaultProps = {
    label: 'Submit',
    className: 'btn btn-submit clickable',
    extendedClass: '',
    onClick: () => null
}

CancelButton.propTypes = {
    label: Proptypes.string,
    onClick: Proptypes.func,
    className: Proptypes.string,
    extendedClass: Proptypes.string
}

export default CancelButton;

