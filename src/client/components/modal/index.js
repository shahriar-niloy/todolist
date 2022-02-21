import React from 'react';
import ReactModal from 'react-modal';

function Modal({ children, extendedClass='', ...rest }) {
    const className = "modal-body " + extendedClass;

    return <ReactModal 
        ariaHideApp={false}
        overlayClassName="modal-overlay"
        className={className}
        {...rest}
    >
        {children}
    </ReactModal>
}

export default Modal;