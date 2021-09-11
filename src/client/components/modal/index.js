import React from 'react';
import ReactModal from 'react-modal';

function Modal({ children, ...rest }) {
    return <ReactModal {...rest} ariaHideApp={false} >{children}</ReactModal>
}

export default Modal;