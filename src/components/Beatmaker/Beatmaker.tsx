import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';
import { useStore } from '../../store/useStore';
import samplesCollection from './constants';
import Loader from '../Loader/Loader';
import setSamplesToState from './utils/utils';
import { ISamplesState } from './types';
import { PlayButton } from '../PlayButton/PlayButton';

const Beatmaker = observer(function Beatmaker() {
  const [playActive, setPlayActive] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [samples, setSamples] = useState<ISamplesState[]>([]);
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
  const playSound = useCallback((audioBuffer: AudioBuffer) => {
    const newAudioContext = new AudioContext();
    const sampleSource = newAudioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(newAudioContext.destination);
    sampleSource.onended = () => {
      newAudioContext.close();
    };
    sampleSource.start();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playActive) {
        setTick(prevTime => (tick < slotsCount - 1 ? prevTime + 1 : 0));
      } else {
        setTick(-1);
      }
    }, tickSpeed);
    return () => {
      window.clearInterval(timer);
    };
  }, [tick, playActive]);

  const renderSampleRow = (sample: ISamplesState, i: number) => {
    return [...Array(slotsCount)].map((e, index) => (
      <BeatmakerSlot
        key={index.toString() + i.toString()}
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
          {samples.map((sample, index) => {
            return (
              <div className={styles.beatmaker_row} key={index}>
                <div className={styles.beatmaker_previewButton} onClick={() => {}} />
                <div style={{ width: '100px' }}>{sample.sampleData.label}</div>
                {/* <BeatSelect /> */}
                {renderSampleRow(sample, index)}
              </div>
            );
          })}
          <PlayButton
            title={playActive ? 'Stop' : 'Play'}
            type={playActive ? 'stop' : 'play'}
            onClick={() => {
              setPlayActive(!playActive);
            }}
          />
        </>
      )}
    </div>
  );
});

export default Beatmaker;
