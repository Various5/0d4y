import { useState } from 'react';
import styles from '../styles/CubeMenu.module.css';

const CubeMenu = () => {
  const [face, setFace] = useState('front');

  const rotateCube = (newFace) => {
    setFace(newFace);
  };

  return (
    <div className={styles.scene}>
      <div className={`${styles.cube} ${styles[face]}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <a href="/" className={styles.menuItem}>Home</a>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <a href="/about" className={styles.menuItem}>About</a>
        </div>
        <div className={`${styles.face} ${styles.right}`}>
          <a href="/blog" className={styles.menuItem}>Blog</a>
        </div>
        <div className={`${styles.face} ${styles.left}`}>
          <a href="/games" className={styles.menuItem}>Games</a>
        </div>
        <div className={`${styles.face} ${styles.top}`}>
          <a href="/tools" className={styles.menuItem}>Tools</a>
        </div>
        <div className={`${styles.face} ${styles.bottom}`}>
          <a href="/profile" className={styles.menuItem}>Profile</a>
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={() => rotateCube('front')}>Front</button>
        <button onClick={() => rotateCube('back')}>Back</button>
        <button onClick={() => rotateCube('right')}>Right</button>
        <button onClick={() => rotateCube('left')}>Left</button>
        <button onClick={() => rotateCube('top')}>Top</button>
        <button onClick={() => rotateCube('bottom')}>Bottom</button>
      </div>
    </div>
  );
};

export default CubeMenu;
