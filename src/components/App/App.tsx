import React from 'react';
import styles from './App.module.scss';
import Beatmaker from '../Beatmaker/Beatmaker';
import Logo from '../Logo/Logo';
import VolumeController from '../VolumeController/VolumeController';
import MainLayout from '../MainLayout/MainLayout';

function App() {
  return (
    <MainLayout>
      <Logo />
      <Beatmaker />
      {/* <VolumeController /> */}
    </MainLayout>
  );
}

export default App;
