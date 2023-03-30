import React, { FC } from 'react';
import styles from './PlayButton.module.scss';
import { IPlayButton } from './types';

export const PlayButton: FC<IPlayButton> = ({ title, type, onClick }) => {
  return (
    <button className={`${styles.playButton} ${styles[type]}`} onClick={onClick}>
      {title}
    </button>
  );
};
