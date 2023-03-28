import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import bassUrl from '../../sounds/205072__thalamus_lab__tapping-amphora-11.wav';
import snareUrl from '../../sounds/347323__newagesoup__thick-stamp-sub.wav';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';
import { useStore } from '../../store/useStore';

const Beatmaker = observer(function Beatmaker() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [sample, setSample] = useState<AudioBuffer | null>(null);
  const [secSample, setSecSample] = useState<AudioBuffer | null>(null);
  const store = useStore();
  const slotsCount = 12;
  const tickSpeed = 150;
  const [tick, setTick] = useState<number>(0);

  // Getting file and converting it audio buffer
  async function loadSample(filePath: string) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext?.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  const loadBass = () => {
    loadSample(bassUrl).then(resp => {
      console.log(resp);
      if (resp) {
        setSample(resp);
      }
    });
  };

  const loadSecond = () => {
    loadSample(snareUrl).then(resp => {
      console.log(resp);
      if (resp) {
        setSecSample(resp);
      }
    });
  };

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
  }, []);

  useEffect(() => {
    if (audioContext && !sample) {
      loadBass();
      loadSecond();
    }
  }, [audioContext]);

  function playBass(buffer) {
    if (audioContext) {
      const sampleSource = audioContext.createBufferSource();
      sampleSource.buffer = buffer;
      sampleSource.connect(audioContext.destination);
      sampleSource.start();
    }
  }

  function playSec(buffer) {
    if (audioContext) {
      const sampleSource = audioContext.createBufferSource();
      sampleSource.buffer = buffer;
      sampleSource.connect(audioContext.destination);
      sampleSource.start();
    }
  }

  const playSound = useCallback(() => {
    playBass(sample);
  }, [audioContext, sample]);

  const playSnare = useCallback(() => {
    playSec(secSample);
  }, [audioContext, secSample]);

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

  const renderBass = useMemo(
    () =>
      [...Array(slotsCount)].map((e, index) => (
        <BeatmakerSlot
          key={index}
          beatType='bass'
          soundCallback={playSound}
          index={index}
          play={index === tick}
        />
      )),
    [slotsCount, tick, tickSpeed]
  );

  const renderSnare = useMemo(
    () =>
      [...Array(slotsCount)].map((e, index) => (
        <BeatmakerSlot
          key={index}
          beatType='bass'
          soundCallback={playSnare}
          index={index}
          play={index === tick}
        />
      )),
    [slotsCount, tick, tickSpeed]
  );

  return (
    <div className={styles.beatmaker}>
      <button onClick={() => store.togglePlayActive()}>{store.playActive ? 'Stop' : 'Play'}</button>
      <div className={styles.beatmaker_row}>
        <div className={styles.beatmaker_previewButton} onClick={() => {}}>
          Bass
        </div>
        {renderBass}
      </div>
      <div className={styles.beatmaker_row}>
        <div className={styles.beatmaker_previewButton} onClick={() => {}}>
          Bass
        </div>
        {renderSnare}
      </div>
    </div>
  );
});

export default Beatmaker;
