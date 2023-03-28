import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';
import { useStore } from '../../store/useStore';
import samplesCollection from './constants';
import Loader from '../Loader/Loader';
import setSamplesToState from './utils/utils';
import { ISamplesState } from './types';

const Beatmaker = observer(function Beatmaker() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [samples, setSamples] = useState<ISamplesState[]>([]);
  const store = useStore();
  const slotsCount = 12;
  const tickSpeed = 150;
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
  }, []);

  useEffect(() => {
    if (audioContext) {
      samplesCollection.map(sample => {
        setSamplesToState(sample, audioContext, setSamples);
      });
    }
  }, [audioContext]);

  //
  const playSound = useCallback(
    (audioBuffer: AudioBuffer) => {
      if (audioContext) {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        sampleSource.connect(audioContext.destination);
        sampleSource.start();
      }
    },
    [audioContext]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (store.playActive) {
        setTick(prevTime => (tick < slotsCount - 1 ? prevTime + 1 : 0));
      } else {
        setTick(-1);
      }
    }, tickSpeed);
    return () => {
      window.clearInterval(timer);
    };
  }, [tick, store.playActive]);

  const renderSampleRow = (sample: ISamplesState) => {
    return [...Array(slotsCount)].map((e, index) => (
      <BeatmakerSlot
        key={index}
        beatType={sample.sampleData.category}
        audioBuffer={sample.bufferData}
        soundCallback={playSound}
        index={index}
        play={index === tick}
      />
    ));
  };

  return (
    <div className={styles.beatmaker}>
      {!(samples.length > 0) ? (
        <Loader />
      ) : (
        <>
          <button onClick={() => store.togglePlayActive()}>
            {store.playActive ? 'Stop' : 'Play'}
          </button>
          {samples.map(sample => {
            return (
              <div className={styles.beatmaker_row}>
                <div className={styles.beatmaker_previewButton} onClick={() => {}} />
                <div style={{ width: '100px' }}>{sample.sampleData.label}</div>
                {/* <BeatSelect /> */}
                {renderSampleRow(sample)}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
});

export default Beatmaker;
