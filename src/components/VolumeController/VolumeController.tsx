import React from 'react';
import styles from './VolumeController.module.scss';

function VolumeController() {
  return (
    <div className={styles.volumeController}>
      <input type='range' min={0} max={100} />
    </div>
  );
}

export default VolumeController;
