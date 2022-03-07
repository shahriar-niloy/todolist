import { useState, useEffect } from 'react';

const createObjectURL = blob =>  window.URL.createObjectURL(blob);

export function useAudioPlayer(_audioBlob) {
    const [audioHTMLElement, setAudioHTMLElement] = useState(_audioBlob && new Audio(createObjectURL(_audioBlob)) || null);
    const [audioPlayerProps, setAudioPlayerProps] = useState({});

    const isDurationNumber = duration => duration !== Infinity && !Number.isNaN(duration);

    const buildAudioProps = audioHTMLElement => {
        const duration = audioHTMLElement.duration;

        return {
            play: audioHTMLElement.play.bind(audioHTMLElement), 
            pause: audioHTMLElement.pause.bind(audioHTMLElement),
            duration: isDurationNumber(duration) && duration || 0,
            currentTime: audioHTMLElement.currentTime,
            isPaused: audioHTMLElement.paused,
            isPlaying: !audioHTMLElement.paused
        }
    }

    useEffect(() => {
        if (audioHTMLElement) {
            audioHTMLElement.preload = 'auto';
            audioHTMLElement.currentTime = Number.MAX_VALUE;

            audioHTMLElement.ondurationchange = e => {
                if (isDurationNumber(e.target.duration)) audioHTMLElement.currentTime = 0;
                setAudioPlayerProps(buildAudioProps(e.target));
            };
            
            audioHTMLElement.ontimeupdate = e => setAudioPlayerProps(buildAudioProps(e.target));

            setAudioPlayerProps(buildAudioProps(audioHTMLElement));
        }
        return () => 
            audioHTMLElement && 
            !audioHTMLElement.isPaused && 
            audioHTMLElement.pause();
    }, [audioHTMLElement]);

    return { 
        setAudio: blob => {
            if (audioHTMLElement) audioHTMLElement.pause();

            if (!blob) return audioPlayerProps;

            const audioHTMLElementToSet = new Audio(createObjectURL(blob));
            setAudioHTMLElement(audioHTMLElementToSet);

            return buildAudioProps(audioHTMLElementToSet);
        },
        ...audioPlayerProps
    }
}