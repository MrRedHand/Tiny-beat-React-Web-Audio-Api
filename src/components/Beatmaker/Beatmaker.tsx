import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Beatmaker.module.scss';
import audioUrl from '../../sounds/561593__panxozerok__safari-kick-2.wav';
import BeatmakerSlot from './BeatmakerSlot/BeatmakerSlot';

const Beatmaker = observer(function Beatmaker() {
  const [tick, setTick] = useState<number>(0);
  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);

  const slotsCount = 16;

  const tickSpeed = 150;

  const playBass = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    audio.playbackRate = 1;
    audio.volume = 1;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(prevTime => (tick < slotsCount ? prevTime + 1 : 0));
    }, tickSpeed);
    return () => {
      window.clearInterval(timer);
    };
  }, [tick]);

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
