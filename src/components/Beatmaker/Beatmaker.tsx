import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import bassUrl from '../../sounds/561593__panxozerok__safari-kick-2.wav';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';
import { useStore } from '../../store/useStore';

const Beatmaker = observer(function Beatmaker() {
  const store = useStore();
  const [tick, setTick] = useState<number>(0);
  const audioBass = useMemo(() => new Audio(bassUrl), [bassUrl]);

  const slotsCount = 12;

  const tickSpeed = 150;

  const playBass = useCallback(() => {
    console.log('bass');
    audioBass.pause();
    audioBass.currentTime = -3;
    audioBass.playbackRate = 1;
    audioBass.volume = 1;
    audioBass.play();
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

  return (
    <div className={styles.beatmaker}>
      <button onClick={() => store.togglePlayActive()}>{store.playActive ? 'Stop' : 'Play'}</button>
      <div className={styles.beatmaker_row}>
        <div className={styles.beatmaker_previewButton} onClick={() => playBass()}>
          Bass
        </div>
        {renderBass}
      </div>
    </div>
  );
});

export default Beatmaker;
