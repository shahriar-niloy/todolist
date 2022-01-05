import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MusicIcon from '../ui/icons/music.icon';
import SaveIcon from '../ui/icons/save.icon';
import DeleteIcon from '../ui/icons/delete.icon';
import attachmentTypesConstants from '../../constants/attachment-types.constants';
import { convertBufferToBlob, convertTimeToWords, formatBytes } from '../../utility';
import MicrophoneIcon from '../ui/icons/microphone.icon';
import MicrophoneSlashIcon from '../ui/icons/microphone-slash.icon';
import AttachmentIcon from '../ui/icons/attachment.icon';
import AudioPlayer from '../audio/audio-player.component';
import useAudioRecorder from '../../hooks/audio-recorder.hooks';
import { useAudioPlayer } from '../../hooks/audio-player.hooks';
import NoTaskAttachment from './no-task-attachment.component';
import DeleteConfirmation from '../confirmation/delete-confirmation.component';

function Attachment ({ name, type, size, createdAt, isPlaybackDisabled, onOpen, onDelete }) {
    if (type === attachmentTypesConstants.AUDIO) {
        return <div className='attachment'>
            <MusicIcon className="attachment-icon me-3" fontSize={26} />
            <div className='attachment-info'>
                <div className='attachment-name'>{name}</div>
                <div className='attachment-metadata'>
                    <span className='me-2'>{formatBytes(size)}</span>
                    <span>{convertTimeToWords(createdAt)}</span>
                </div>
            </div>
            <div className='attachment-actions'>
                <span onClick={onOpen} className={`me-1 ${isPlaybackDisabled ? 'disabled' : ''}`}>Play</span>
                <span onClick={onDelete}>Delete</span>
            </div>
        </div>
    }
}

function TaskAttachments ({ attachments, onSaveAttachment, onDeleteAttachment, task_id }) {
    const [playAudioAttachment, setPlayAudioAttachment] = useState(false);
    const [unsavedRecording, setUnsavedRecording] = useState(false);
    const [openedAudioBlob, setOpenedAudioBlob] = useState(false);
    const [attachmentIDToDelete, setAttachmentIDToDelete] = useState(null);

    const {
        handleRecordingStart,
        handleRecordingStop,
        audioBlob: recordedAudioBlob,
        isAudioRecording,
        resetRecorder
    } = useAudioRecorder();
    const { play, pause, duration, currentTime, isPaused, setAudio } = useAudioPlayer();

    const hideAudioPlayer = () => {
        setAudio(null);
        setOpenedAudioBlob(null);
        setPlayAudioAttachment(false);
    }

    const hideUnsavedAudioPlayer = () => {
        setAudio(null);
        setUnsavedRecording(false);
        resetRecorder();
    }

    useEffect(() => {
        if (recordedAudioBlob) setAudio(recordedAudioBlob);
    }, [recordedAudioBlob]);

    return <div>
        <div className="task-attachments">
            <div className='attachment-list'>
            {
                attachments && attachments.length > 0 
                    ? 
                        attachments
                            .map(attachment => 
                                <Attachment
                                    key={attachment.id} 
                                    type={attachment.type} 
                                    name={attachment.name} 
                                    size={attachment.file_size}
                                    createdAt={attachment.created_at}
                                    isPlaybackDisabled={unsavedRecording || isAudioRecording}
                                    onOpen={() => {
                                        setPlayAudioAttachment(true);
                                        const attachmentAudioAsBlob = convertBufferToBlob(attachment.data);
                                        setOpenedAudioBlob(attachmentAudioAsBlob);
                                        const { play } = setAudio(attachmentAudioAsBlob);
                                        play();
                                    }}
                                    onDelete={() => setAttachmentIDToDelete(attachment.id)}
                                />)
                    : <NoTaskAttachment />
            }   
            </div>
            {
                playAudioAttachment && 
                    <div className='container-default mt-3'>
                        <AudioPlayer 
                            audioBlob={openedAudioBlob}
                            duration={duration}
                            currentTime={currentTime}
                            isPlaying={!isPaused}
                            onPlay={play}
                            onPause={pause}
                        />
                    </div>
            }
            {unsavedRecording && <div className="recorded-audio-container mt-3">
                <AudioPlayer 
                    audioBlob={recordedAudioBlob}
                    duration={duration}
                    currentTime={currentTime}
                    isPlaying={!isPaused}
                    onPlay={play}
                    onPause={pause}
                />
                <div className="action-bar">
                    <DeleteIcon
                        fontSize={18} 
                        onClick={() => hideUnsavedAudioPlayer()}
                    />
                    <SaveIcon 
                        fontSize={18} 
                        onClick={() => {
                            onSaveAttachment({ 
                                data: recordedAudioBlob, 
                                task_id: task_id,
                                type: attachmentTypesConstants.AUDIO,
                                name: `Audio_${Date.now()}`
                            });
                            hideUnsavedAudioPlayer();
                        }}
                    />
                </div>
            </div>}
            <div className={`container-default tray transition-in ${isAudioRecording ? "tray-opened" : "tray-closed"}`}>
                <MicrophoneSlashIcon 
                    className="animate__blink"
                    onClick={() => {
                        setUnsavedRecording(true);
                        handleRecordingStop();
                    }} 
                    fontSize={28} 
                />
                <div className="mt-2 fw-bold">
                    <span>Stop Recording</span>
                </div>
            </div>
            <div className="attachment-types">
                <AttachmentIcon className="" />
                <MicrophoneIcon 
                    className={isAudioRecording ? "active" : ""} 
                    onClick={() => {
                        handleRecordingStart();
                        hideAudioPlayer();
                        hideUnsavedAudioPlayer();
                    }}
                /> 
            </div>
        </div>
        <DeleteConfirmation 
            isOpen={!!attachmentIDToDelete}
            onDelete={() => {
                hideAudioPlayer();
                onDeleteAttachment(attachmentIDToDelete);
                setAttachmentIDToDelete(null);
            }}
            onCancel={() => setAttachmentIDToDelete(null)}
        >
            Are you sure you want to delete this attachment?
        </DeleteConfirmation>
    </div>
}

TaskAttachments.defaultProps = {
    attachments: [],
}

TaskAttachments.propTypes = {
    task_id: PropTypes.string,
    attachments: PropTypes.array,
    onDeleteAttachment: PropTypes.func,
    onSaveAttachment: PropTypes.func
}

export default TaskAttachments;