import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from './Footer.module.css';

const Footer = () => {
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [session, loading] = useSession();

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
        {loading ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <span onClick={() => signOut()}>Logout ¬ {session.user.name}</span>
          </>
        ) : (
          <span onClick={() => signIn()}>Login</span>
        )}
        <span>Database: {dbStatus}</span>
      </div>
    </footer>
  );
};

export default Footer;
