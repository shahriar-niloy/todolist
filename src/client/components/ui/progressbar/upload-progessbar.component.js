import React from 'react';

function UploadProgressBar ({ progress, className, classExtended }) {
    return <div className={`${className} ${classExtended}`} >
        <span style={{ width: `${progress}%` }} className='progress'></span>
    </div>
}

UploadProgressBar.defaultProps = {
    progress: 0,
    className: 'file-upload-progress-bar',
    classExtended: ''
}

export default UploadProgressBar;