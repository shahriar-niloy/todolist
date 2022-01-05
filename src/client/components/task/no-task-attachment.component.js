import React from 'react';
import AttachmentIcon from '../ui/icons/attachment.icon';

export default function NoTaskAttachment() {
    return <div className="no-attachment">
        <AttachmentIcon className="attachment-icon" />
        <h5>No attachments!</h5>
        <h6>Add a new attachment to the task.</h6>
    </div>
}