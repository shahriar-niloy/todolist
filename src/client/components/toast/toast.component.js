import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastTypes from '../../constants/toast.types';
import ToastConstants from '../../constants/toast.constants';

export default function ToastRoot () {
    return <ToastContainer 
        position="top-right"
        theme='dark'
        autoClose={ToastConstants.AUTOCLOSE_TIME_IN_MILLISECONDS}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />;
}

export function showToast (type, message, props={}) {
    const types = Object.values(ToastTypes);

    if (!types.includes(type) || !message) return;

    if (Array.isArray(message)) return message.forEach(msg => toast[type](msg, props));

    return toast[type](message, props);
}