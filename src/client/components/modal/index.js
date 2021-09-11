import React from 'react';
import ReactModal from 'react-modal';

function Modal({ children, ...rest }) {
    return <ReactModal 
        ariaHideApp={false} 
        style={{ 
            overlay: { backgroundColor: 'rgba(255, 255, 255, 0)' },
            content: { 
                backgroundColor: '#202020', 
                boxShadow: '0px 0px 20px #131313', 
                border: 0,
                inset: '100px 150px'
            }
        }}
        {...rest}
    >
        {children}
    </ReactModal>
}

export default Modal;