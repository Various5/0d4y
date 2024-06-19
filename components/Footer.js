import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [dbStatus, setDbStatus] = useState('Checking...');

  useEffect(() => {
    const fetchDbStatus = async () => {
      try {
        const response = await fetch('/api/db-status');
        const data = await response.json();
        setDbStatus(data.status);
      } catch (error) {
        setDbStatus('offline');
      }
    };

    fetchDbStatus();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.status}>
        <span>Login: User</span>
        <span>Database: {dbStatus}</span>
      </div>
    </footer>
  );
};

export default Footer;
