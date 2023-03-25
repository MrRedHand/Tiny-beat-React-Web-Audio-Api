import React from 'react';
import styles from './App.module.scss';
import Beatmaker from '../Beatmaker/Beatmaker';
import Logo from '../Logo/Logo';
import VolumeController from '../VolumeController/VolumeController';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.mainLayout}>
        <Logo />
        <Beatmaker />
        <VolumeController />
      </div>
    </div>
  );
}

export default App;
