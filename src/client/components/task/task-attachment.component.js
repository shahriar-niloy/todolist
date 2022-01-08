import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import FileIcon from '../ui/icons/file.icon';
import ImageIcon from '../ui/icons/image.icon';
import UploadProgressBar from '../ui/progressbar/upload-progessbar.component';
import ImagePreview from '../misc/image-preview.component';

const formatDateTime = date => moment(date).format('DD MMMM YYYY hh:mm A');

function Attachment ({ name, type, size, createdAt, isOpenDisabled, onOpen, onDelete }) {
    const attachmentIcons = {
        [attachmentTypesConstants.AUDIO]: <MusicIcon className="attachment-icon me-3" fontSize={26} />,
        [attachmentTypesConstants.FILE]: <FileIcon className="attachment-icon me-3" fontSize={26} />,
        [attachmentTypesConstants.IMAGE]: <ImageIcon className="attachment-icon me-3" fontSize={26} />
    };

    const openButtonLabelByType = {
        [attachmentTypesConstants.AUDIO]: 'Play',
        [attachmentTypesConstants.FILE]: 'Open',
        [attachmentTypesConstants.IMAGE]: 'Open'
    };

    if (!Object.values(attachmentTypesConstants).includes(type)) return null;

    return <div className='attachment'>
        {attachmentIcons[type]}
        <div className='attachment-info'>
            <div className='attachment-name'>{name}</div>
            <div className='attachment-metadata'>
                <span className='me-2'>{formatBytes(size)}</span>
                <span>{convertTimeToWords(createdAt)}</span>
            </div>
        </div>
        <div>
            <span onClick={onOpen} className={`button-small-default me-1 ${isOpenDisabled ? 'disabled' : ''}`}>{openButtonLabelByType[type]}</span>
            <span onClick={onDelete} className='button-small-default'>Delete</span>
        </div>
    </div>
}

function TaskAttachments ({ attachments, onSaveAttachment, onDeleteAttachment, onFileOpen, task_id }) {
    const [playAudioAttachment, setPlayAudioAttachment] = useState(false);
    const [unsavedRecording, setUnsavedRecording] = useState(false);
    const [openedAudioBlob, setOpenedAudioBlob] = useState(false);
    const [attachmentIDToDelete, setAttachmentIDToDelete] = useState(null);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [hasUnsavedImage, setHasUnsavedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);
    const [showExpandedImagePreview, setShowExpandedImagePreview] = useState(false);

    const {
        handleRecordingStart,
        handleRecordingStop,
        audioBlob: recordedAudioBlob,
        isAudioRecording,
        resetRecorder
    } = useAudioRecorder();
    const { play, pause, duration, currentTime, isPaused, setAudio } = useAudioPlayer();

    const resetFileTo = (file) => {
        setFile(file);
        setIsUploadInProgress(false);
        setUploadProgress(0);
    };

    const resetImageTo = (image, isUnsavedImage=false) => {
        setImage(image);
        setIsUploadInProgress(false);
        setUploadProgress(0);
        setHasUnsavedImage(isUnsavedImage);
    };

    const handleOpenAttachment = attachment => {
        const { type, data, mimetype, name } = attachment;

        if (type === attachmentTypesConstants.AUDIO) {
            setPlayAudioAttachment(true);
            
            const attachmentAudioAsBlob = convertBufferToBlob(data, mimetype);
            
            setOpenedAudioBlob(attachmentAudioAsBlob);
            const { play } = setAudio(attachmentAudioAsBlob);
            
            play();
        }

        if (type === attachmentTypesConstants.FILE) onFileOpen(data, name, mimetype);

        if (type === attachmentTypesConstants.IMAGE) {
            setImage(convertBufferToBlob(data, mimetype));
            setShowExpandedImagePreview(true);
            setHasUnsavedImage(false);
        }
    };

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

    const isAttachmentOpenDisabled = () => unsavedRecording || isAudioRecording || hasUnsavedImage;

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
                                    data={attachment.data}
                                    createdAt={attachment.created_at}
                                    isOpenDisabled={isAttachmentOpenDisabled()}
                                    onOpen={() => handleOpenAttachment(attachment)}
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
                            onSaveAttachment(
                                { 
                                    data: recordedAudioBlob, 
                                    task_id: task_id,
                                    type: attachmentTypesConstants.AUDIO,
                                    name: `Audio_${Date.now()}`
                                }
                            );
                            hideUnsavedAudioPlayer();
                        }}
                    />
                </div>
            </div>}
            {
                file && <div className='unsaved-file-attachment'>
                    <div>
                        <div className='file-name' >{file.name}</div>
                        <div className='file-metadata'>
                            <span className='me-2'>{formatBytes(file.size)}</span>
                            <span>{formatDateTime(file.lastModifiedDate)}</span>
                        </div>
                        {
                            isUploadInProgress && <UploadProgressBar classExtended="mt-2" progress={uploadProgress} />
                        }
                    </div>
                    <div>
                        <span 
                            className={`button-small-default ${isUploadInProgress ? 'disabled' : ''}`} 
                            onClick={() => {
                                onSaveAttachment(
                                    { 
                                        data: file, 
                                        task_id: task_id,
                                        type: attachmentTypesConstants.FILE,
                                        name: file.name
                                    },
                                    () => resetFileTo(null),
                                    progress => {
                                        setUploadProgress(progress);
                                        setIsUploadInProgress(true);
                                    }
                                );
                            }}
                        >
                            Save
                        </span>
                    </div>
                </div>
            }
            {
                hasUnsavedImage && image && <div className='unsaved-image-attachment'>
                    <div className='image-preview-container'>
                        {
                            (() => {
                                const imageSrc = URL.createObjectURL(image);
                                return <div className="image-preview">
                                    <img 
                                        className="" 
                                        src={imageSrc} 
                                        onClick={() => setShowExpandedImagePreview(true)}
                                        onLoad={() => URL.revokeObjectURL(imageSrc)} 
                                    />
                                    <UploadProgressBar 
                                        className="image-upload-progress-bar" 
                                        progress={uploadProgress} 
                                    />
                                </div>
                            })()
                        }
                        <div className='image-info-container'>
                            <div className='image-name text-truncate' >{image.name}</div>
                            <div className='image-metadata'>
                                <span className='me-2'>{formatBytes(image.size)}</span>
                                <span>{formatDateTime(image.lastModifiedDate)}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span 
                            className={`button-small-default ${isUploadInProgress ? 'disabled' : ''}`} 
                            onClick={() => {
                                onSaveAttachment(
                                    { 
                                        data: image, 
                                        task_id: task_id,
                                        type: attachmentTypesConstants.IMAGE,
                                        name: image.name
                                    },
                                    () => resetImageTo(null, false),
                                    progress => {
                                        setUploadProgress(progress);
                                        setIsUploadInProgress(true);
                                    }
                                );
                            }}
                        >
                            Save
                        </span>
                    </div>
                </div>
            }
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
                <label for="upload-file">
                    <AttachmentIcon className="" />
                    <input 
                        style={{ opacity: 0, position: 'absolute', zIndex: -1 }} 
                        type='file' 
                        name='file' 
                        id='upload-file' 
                        onChange={e => resetFileTo(e.target.files[0]) } 
                    />
                </label>
                <MicrophoneIcon 
                    className={isAudioRecording ? "active" : ""} 
                    onClick={() => {
                        handleRecordingStart();
                        hideAudioPlayer();
                        hideUnsavedAudioPlayer();
                    }}
                /> 
                <label for="upload-image">
                    <ImageIcon />
                    <input 
                        style={{ opacity: 0, position: 'absolute', zIndex: -1 }} 
                        type='file' 
                        name='image' 
                        id='upload-image' 
                        accept='image/*'
                        onChange={e => resetImageTo(e.target.files[0], true) } 
                    />
                </label>
            </div>
        </div>
        <ImagePreview 
            isOpen={showExpandedImagePreview} 
            image={image}
            onClose={() => setShowExpandedImagePreview(false)} 
        />
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
    onSaveAttachment: PropTypes.func,
    onFileOpen: PropTypes.func
}

export default TaskAttachments;