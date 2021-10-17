import React from 'react';
import Proptypes from 'prop-types';

function DeleteButton({ className, extendedClass, label, onClick }) {
    return <span className={`${className} ${extendedClass}`} onClick={onClick} >{label}</span>
}

DeleteButton.defaultProps = {
    label: 'Delete',
    className: 'btn btn-delete clickable',
    extendedClass: '',
    onClick: () => null
}

DeleteButton.propTypes = {
    label: Proptypes.string,
    onClick: Proptypes.func,
    className: Proptypes.string,
    extendedClass: Proptypes.string
}

export default DeleteButton;

