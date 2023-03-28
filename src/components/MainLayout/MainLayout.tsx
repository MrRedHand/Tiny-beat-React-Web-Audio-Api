import React, { FC, ReactNode } from 'react';
import styles from './MainLayout.module.scss';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <section className={styles.mainLayout}>{children}</section>;
};

export default MainLayout;
