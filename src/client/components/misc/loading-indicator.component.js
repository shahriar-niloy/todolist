import React from 'react';
import LinearDots from '../ui/spinner/linear-dots.component';

function LoadingIndicator() {
    return <div id="loader" className='loader-overlay'>
        <div className='loader-container'>
            <LinearDots />
        </div>        
    </div>
}

export default LoadingIndicator;