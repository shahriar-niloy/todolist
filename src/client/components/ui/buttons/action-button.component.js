import React from 'react';
import Proptypes from 'prop-types';

function ActionButton({ className, extendedClass, label, children, onClick }) {
    return <span className={`${className} ${extendedClass}`} onClick={onClick} >
        {children ? children : label}
    </span>
}

ActionButton.defaultProps = {
    label: 'Submit',
    className: 'btn btn-action clickable',
    extendedClass: '',
    onClick: () => null
}

ActionButton.propTypes = {
    label: Proptypes.string,
    onClick: Proptypes.func,
    className: Proptypes.string,
    extendedClass: Proptypes.string
}

export default ActionButton;

