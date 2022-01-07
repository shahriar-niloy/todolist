import React from 'react';

function UploadProgressBar ({ progress, classExtended }) {
    return <div className={`file-upload-progress-bar ${classExtended}`} >
        <span style={{ width: `${progress}%` }} className='progress'></span>
    </div>
}

UploadProgressBar.defaultProps = {
    progress: 0,
    classExtended: ''
}

export default UploadProgressBar;