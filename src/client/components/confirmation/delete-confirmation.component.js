import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import SubmitButton from '../ui/buttons/submit-button.component';
import CancelButton from '../ui/buttons/cancel-button.component';

const taskFormModalStyle = {
    content: {
      minWidth: '400px'
    }
};

function DeleteConfirmation({ isOpen, children, onDelete, onCancel }) {
    return <Modal isOpen={isOpen} style={taskFormModalStyle} >
        <div className="py-3">{children}</div>
        <div className="d-flex justify-content-end">
            <CancelButton extendedClass="me-2" label="Cancel" onClick={onCancel} />
            <SubmitButton label='Delete' onClick={onDelete} />
        </div>
    </Modal>
}

DeleteConfirmation.defaultProps = {
    isOpen: true
}

DeleteConfirmation.propTypes = {
    isOpen: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default DeleteConfirmation;