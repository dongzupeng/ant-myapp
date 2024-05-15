import React from 'react';
import styles from './index.module.less';

export default function Loading() {
  return (
    <div className={styles.content}>
      <div className={styles.text}>LOADING...</div>
      <div className={styles.text}>LOADING...</div>
    </div>
  );
}
