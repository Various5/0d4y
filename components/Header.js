import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navItem}>Home</a>
        <a href="/about" className={styles.navItem}>About</a>
        <a href="/blog" className={styles.navItem}>Blog</a>
        <a href="/games" className={styles.navItem}>Games</a>
        <a href="/tools" className={styles.navItem}>Tools</a>
        <a href="/profile" className={styles.navItem}>Profile</a>
      </nav>
    </header>
  );
};

export default Header;
