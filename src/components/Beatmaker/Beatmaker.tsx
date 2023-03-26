import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import bassUrl from '../../sounds/561593__panxozerok__safari-kick-2.wav';
import hatsUrl from '../../sounds/209513__it_was_the_sun__snare1.wav';
import keyUrl from '../../sounds/Evil_Pulse.wav';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';
import { useStore } from '../../store/useStore';

const Beatmaker = observer(function Beatmaker() {
  const store = useStore();
  const [tick, setTick] = useState<number>(0);
  const audioBass = useMemo(() => new Audio(bassUrl), [bassUrl]);
  const audioHats = useMemo(() => new Audio(hatsUrl), [hatsUrl]);
  const audioKey = useMemo(() => new Audio(keyUrl), [keyUrl]);

  const slotsCount = 12;

  const tickSpeed = 150;

  const playBass = useCallback(() => {
    audioBass.pause();
    audioBass.currentTime = -3;
    audioBass.playbackRate = 1;
    audioBass.volume = 1;
    audioBass.play();
  }, []);

  const playHats = useCallback(() => {
    audioHats.pause();
    audioHats.currentTime = 0;
    audioHats.play();
    audioHats.playbackRate = 1;
    audioHats.volume = 1;
  }, []);

  const playKey = useCallback(() => {
    audioKey.pause();
    audioKey.currentTime = 0;
    audioKey.play();
    audioKey.playbackRate = 1;
    audioKey.volume = 1;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (store.playActive) {
        setTick(prevTime => (tick < slotsCount ? prevTime + 1 : 0));
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
          soundCallback={playBass}
          index={index}
          play={index === tick}
        />
      )),
    [slotsCount, tick, tickSpeed]
  );

  const renderHats = useMemo(
    () =>
      [...Array(slotsCount)].map((e, index) => (
        <BeatmakerSlot
          key={index}
          beatType='hat'
          soundCallback={playHats}
          index={index}
          play={index === tick}
        />
      )),
    [slotsCount, tick, tickSpeed]
  );

  const renderKeys = useMemo(
    () =>
      [...Array(slotsCount)].map((e, index) => (
        <BeatmakerSlot
          key={index}
          beatType='hat'
          soundCallback={playKey}
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
        <div className={styles.beatmaker_previewButton} onClick={() => playBass()}>
          Bass
        </div>
        {renderBass}
      </div>
      <div className={styles.beatmaker_row}>
        <div className={styles.beatmaker_previewButton} onClick={() => playBass()}>
          Hats
        </div>
        {renderHats}
      </div>
      <div className={styles.beatmaker_row}>
        <div className={styles.beatmaker_previewButton} onClick={() => playBass()}>
          Keys
        </div>
        {renderKeys}
      </div>
    </div>
  );
});

export default Beatmaker;
