import React, { FC, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react-lite';
import styles from './BeatmakerSlot.module.scss';
import { IBeatmakerSlot } from '../../../types';

const BeatmakerSlot: FC<IBeatmakerSlot> = observer(function BeatmakerSlot({
  beatType,
  play = false,
  soundCallback,
  audioBuffer
}) {
  const [checked, setChecked] = useState<boolean>(false);
  const slotId = useMemo(() => uuidv4(), []);

  function handleSlotChecked() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (play && checked) {
      soundCallback(audioBuffer);
    }
  }, [play, checked]);

  return (
    <div className={`${styles.beatSlot} ${play ? styles.active : ''}`}>
      <input type='checkbox' id={slotId} checked={checked} onChange={handleSlotChecked} />
      <label htmlFor={slotId}>
        <div className={`${styles.beatSlot_mark} ${styles[beatType]}`} />
      </label>
    </div>
  );
});

export default BeatmakerSlot;
