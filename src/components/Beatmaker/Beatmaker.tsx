import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';
import { useStore } from '../../store/useStore';
import samplesCollection from './constants';
import BeatSelect from '../BeatSelect/BeatSelect';
import Loader from '../Loader/Loader';
import setSamplesToState from './utils/utils';
import { ISamplesState } from './types';

const Beatmaker = observer(function Beatmaker() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [samples, setSamples] = useState<ISamplesState[]>([]);
  const [selectedBass, setSelectedBass] = useState(null);
  const store = useStore();
  const slotsCount = 12;
  const tickSpeed = 150;
  const [tick, setTick] = useState<number>(0);

  // const loadBass = () => {
  //   if (audioContext) {
  //     setSample(bassUrl, setBassSample, audioContext);
  //   }
  // };
  //
  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
  }, []);
  //
  useEffect(() => {
    if (audioContext) {
      samplesCollection.map(sample => {
        setSamplesToState(sample, audioContext, setSamples);
      });
    }
  }, [audioContext]);

  useEffect(() => {
    console.log(samples);
  }, [samples]);
  //
  // function playBass(buffer: AudioBuffer) {
  //   if (audioContext) {
  //     const sampleSource = audioContext.createBufferSource();
  //     sampleSource.buffer = buffer;
  //     sampleSource.connect(audioContext.destination);
  //     sampleSource.start();
  //   }
  // }
  //
  // const playSound = useCallback(() => {
  //   if (bassSample) {
  //     playBass(bassSample);
  //   }
  // }, [audioContext, bassSample]);
  //
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (store.playActive) {
  //       setTick(prevTime => (tick < slotsCount - 1 ? prevTime + 1 : 0));
  //     } else {
  //       setTick(-1);
  //     }
  //   }, tickSpeed);
  //   return () => {
  //     window.clearInterval(timer);
  //   };
  // }, [tick, store.playActive]);

  const renderSampleRow = useMemo(
    () =>
      [...Array(slotsCount)].map((e, index) => (
        <BeatmakerSlot
          key={index}
          beatType='bass'
          soundCallback={() => {}}
          index={index}
          play={index === tick}
        />
      )),
    [slotsCount, tick, tickSpeed]
  );

  return (
    <div className={styles.beatmaker}>
      {!(samples.length > 0) ? (
        <Loader />
      ) : (
        <>
          <button onClick={() => store.togglePlayActive()}>
            {store.playActive ? 'Stop' : 'Play'}
          </button>
          <div className={styles.beatmaker_row}>
            <div className={styles.beatmaker_previewButton} onClick={() => {}} />
            <BeatSelect />
            {renderSampleRow}
          </div>
        </>
      )}
    </div>
  );
});

export default Beatmaker;
