import React from 'react';
import { useSession } from 'next-auth/react';
import styles from './Header.module.css';

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navItem}>Home</a>
        <a href="/blog" className={styles.navItem}>Blog</a>
        <a href="/games" className={styles.navItem}>Games</a>
        <a href="/0day" className={styles.navItem}>0-Days</a>
        {loading ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <a href="/profile" className={styles.navItem}>Profile</a>
            <a href="/create-post" className={styles.navItem}>Create Blogpost</a>
          </>
        ) : (
          <a href="/auth/register" className={styles.navItem}>Register Account</a>
        )}
      </nav>
    </header>
  );
};

export default Header;
