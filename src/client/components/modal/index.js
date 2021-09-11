import React from 'react';
import ReactModal from 'react-modal';

function Modal({ children, ...rest }) {
    return <ReactModal 
        ariaHideApp={false}
        overlayClassName="modal-overlay"
        className="modal-body"
        {...rest}
    >
        {children}
    </ReactModal>
}

export default Modal;