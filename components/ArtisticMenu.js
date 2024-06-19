import { useState } from 'react';
import styles from '../styles/ArtisticMenu.module.css';

const ArtisticMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={`${styles.circleMenu} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <div className={styles.menuIcon}></div>
      </div>
      <div className={`${styles.menuItems} ${isOpen ? styles.show : ''}`}>
        <a href="/" className={styles.menuItem}>Home</a>
        <a href="/about" className={styles.menuItem}>About</a>
        <a href="/blog" className={styles.menuItem}>Blog</a>
        <a href="/games" className={styles.menuItem}>Games</a>
        <a href="/tools" className={styles.menuItem}>Tools</a>
        <a href="/profile" className={styles.menuItem}>Profile</a>
      </div>
    </div>
  );
};

export default ArtisticMenu;
