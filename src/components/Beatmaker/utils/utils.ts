import { SetStateAction } from 'react';
import { ISamplesCollection, ISamplesState } from '../types';

async function loadSample(filePath: string, audioContext: AudioContext) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext?.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

const setSamplesToState = (
  sample: ISamplesCollection,
  audioContext: AudioContext,
  setState: (e: SetStateAction<ISamplesState[]>) => void
): AudioBuffer | null => {
  loadSample(sample.url, audioContext).then(resp => {
    if (resp) {
      setState(prevState => [...prevState, { sampleData: sample, bufferData: resp }]);
    }
    return null;
  });
  return null;
};

export default setSamplesToState;
