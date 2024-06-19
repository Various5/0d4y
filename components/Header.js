import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true); // Example state for login status

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navItem}>Home</a>
        <a href="/blog" className={styles.navItem}>Blog</a>
        <a href="/tools" className={styles.navItem}>Tools</a>
        <a href="/games" className={styles.navItem}>Games</a>
        {loggedIn && (
          <>
            <a href="/about" className={styles.navItem}>About</a>
            <a href="/profile" className={styles.navItem}>Profile</a>
            <a href="/create-post" className={styles.navItem}>Create Post</a>
            <a href="/dashboard" className={styles.navItem}>Dashboard</a>
            <a href="/downloads" className={styles.navItem}>Downloads</a>
            <a href="/iptools" className={styles.navItem}>IP Tools</a>
            <a href="/create-knowledgebase" className={styles.navItem}>Create Knowledgebase</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
