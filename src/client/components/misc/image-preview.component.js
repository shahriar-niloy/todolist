import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';

const modalStyle = { content: { minWidth: '300px' } };

function ImagePreview({ isOpen, onClose, image }) {
    const imageSrc = image ? URL.createObjectURL(image) : null;

    return <Modal isOpen={isOpen} style={modalStyle} onRequestClose={onClose} >
        <div className="p-1">
            <img style={{ height: '650px', objectFit: 'contain' }} src={imageSrc} onLoad={() => URL.revokeObjectURL(imageSrc)} />
        </div>
    </Modal>
}

ImagePreview.defaultProps = {
    isOpen: true
}

ImagePreview.propTypes = {
    isOpen: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ImagePreview;