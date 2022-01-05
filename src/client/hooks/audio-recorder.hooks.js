import React, { useEffect, useState } from 'react';

export default function useAudioRecorder () {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const [isAudioRecording, setIsAudioRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const handleRecordingStart = () => {
        if (!isAudioRecording && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia ({ audio: true })
                .then(function(stream) {
                    const recorder = new MediaRecorder(stream);
                    recorder.start();
                    
                    let chunks = [];
                    setIsAudioRecording(true);
                    setMediaRecorder(recorder);
                    
                    recorder.ondataavailable = e => chunks.push(e.data);

                    recorder.onstop = function(e) {
                        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                        setAudioBlob(blob);

                        const audioURL = window.URL.createObjectURL(blob);
                        setAudioURL(audioURL);

                        setIsAudioRecording(false);
                        chunks = [];
                        stream.getAudioTracks().forEach(track => track.stop());
                    }
                })
                .catch(function(err) {
                   console.log('The following getUserMedia error occurred: ' + err);
                });
        }
    }

    const handleRecordingStop = () => 
        mediaRecorder && 
        mediaRecorder.state !== 'inactive' &&
        mediaRecorder.stop();

    const resetRecorder = () => {
        setAudioBlob(null);
        setAudioURL(null);
    };

    useEffect(() => {
        return () => handleRecordingStop();
    }, [mediaRecorder]);

    return {
        audioBlob,
        audioURL,
        isAudioRecording,
        resetRecorder,
        handleRecordingStart,
        handleRecordingStop
    };
}
