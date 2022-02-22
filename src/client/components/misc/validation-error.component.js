import React from 'react';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

function ValidationError({ className, name }) {
    return <span className={className}><ErrorMessage name={name} /></span>
}

ValidationError.defaultProps = {
    className: 'validation-error'
}

ValidationError.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
}

export default ValidationError;