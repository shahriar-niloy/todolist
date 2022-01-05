import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '../ui/icons/play.icon';
import PauseIcon from '../ui/icons/pause.icon';

const maxNumber = numbers => {
    let maxSoFar = numbers[0]; 

    for (const number of numbers) {
        if (number > maxSoFar) maxSoFar = number;
    }

    return maxSoFar;
}

const normalizeDataPoints = (dataPoints, scale=1) => {
    const maxPoint = maxNumber(dataPoints);
    return dataPoints.map(point => point*scale/maxPoint);
}

function AudioWaveform ({ dataPoints, elapsedPercentage }) {
    const totalDataPoints = dataPoints.length;
    const totalCompletedDataPoints = Math.round((elapsedPercentage * totalDataPoints) / 100);

    return <div className="audio-level">
        { 
            dataPoints.map((point, index) => <div key={index} className={`audio-level-bar ${index < totalCompletedDataPoints ? 'completed' : ''}`} style={{ height: `${Math.floor(point) || 1}%`}}></div>)
        }
    </div>
}

function AudioPlayer ({ isPlaying=false, duration, currentTime, audioBlob, onPlay, onPause }) {
    const [audioWaveform, setAudioWaveform] = useState([]);

    const elapsedTimePercentage = Math.floor((currentTime * 100) / duration);
    const durationSecondsPadByZeroCount = 2;
    const durationMinutesPart = Math.floor(duration / 60);
    const durationSecondsPart = Math.floor(duration) % 60;
    const durationSecondsPartZeroPadded = String(durationSecondsPart).padStart(durationSecondsPadByZeroCount, '0');

    useEffect(() => {
        if (audioBlob) {
            audioBlob.arrayBuffer()
                .then(async audioArrayBuffer => {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    const audioContext = new AudioContext();

                    const decodedAudio = await audioContext.decodeAudioData(audioArrayBuffer);

                    const audioData = decodedAudio.getChannelData(0);
                    const sampleSize = 140;
                    const blocksToAverageASide = 2; 
                    const blockSize = Math.floor(audioData.length / sampleSize);
                    const countOfPointsToAverageOnOneSide = blockSize * blocksToAverageASide;
                    const countOfPointsToAverage = (countOfPointsToAverageOnOneSide * 2) + 1;

                    let sampledAudioLevel = [];

                    for (let i = countOfPointsToAverageOnOneSide; i < audioData.length && sampledAudioLevel.length < sampleSize; i += blockSize) {
                        let sum = 0; 

                        for (let j = i - countOfPointsToAverageOnOneSide; j <= i + countOfPointsToAverageOnOneSide && j < audioData.length; ++j) {
                            sum += Math.abs(audioData[j]);
                        }

                        const average = sum / countOfPointsToAverage;

                        sampledAudioLevel.push(average);
                    }

                    setAudioWaveform(normalizeDataPoints(sampledAudioLevel, 100));
                });
        }
    }, [audioBlob]);

    return <div className="audio-player">
        <div className="me-2 align-y">
            {!isPlaying && <PlayIcon onClick={onPlay} fontSize={23} />}
            {isPlaying && <PauseIcon onClick={onPause} fontSize={23} />}
        </div>
        <AudioWaveform
            dataPoints={audioWaveform}
            elapsedPercentage={elapsedTimePercentage}
        />
        <span className="duration ms-2">{`${durationMinutesPart}:${durationSecondsPartZeroPadded}`}</span>
    </div>
}

AudioPlayer.propTypes = {
    length: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool,
    audioBlob: PropTypes.any,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired
}

export default AudioPlayer;