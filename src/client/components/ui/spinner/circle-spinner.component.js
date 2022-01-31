import React from 'react';

export default function CircleSpinner({ scale=1 }) {
    return <div style={{ transform: `scale(${scale})` }} className="lds-ring"><div></div><div></div><div></div><div></div></div>
}