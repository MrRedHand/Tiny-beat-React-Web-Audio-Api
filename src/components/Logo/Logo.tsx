import React from 'react';
import styles from './Logo.module.scss';
import logoUrl from '../../images/Logo.svg';

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logoUrl} />
    </div>
  );
}

export default Logo;
