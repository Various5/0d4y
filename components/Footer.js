import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const isDatabaseOnline = true; // Example status

  return (
    <footer className={styles.footer}>
      <div className={styles.status}>
        <span>Login: User</span>
        <span>Database: {isDatabaseOnline ? 'Online' : 'Offline'}</span>
      </div>
    </footer>
  );
};

export default Footer;
