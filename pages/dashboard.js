import { useState, useEffect } from 'react';
import withAuth from '../utils/withAuth';
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
  const [dbStatus, setDbStatus] = useState('offline');

  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        const response = await fetch('/api/db-status');
        const data = await response.json();
        setDbStatus(data.status);
      } catch (error) {
        setDbStatus('offline');
      }
    };
 
    checkDbStatus();
    const interval = setInterval(checkDbStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const links = [
    { url: 'https://watch.dnb.ninja', name: 'Watch' },
    { url: 'https://sonar.dnb.ninja', name: 'Sonar' },
    { url: 'https://sab.dnb.ninja', name: 'SAB' },
    { url: 'https://radarr.dnb.ninja', name: 'Radarr' },
    { url: 'https://proxy.dnb.ninja', name: 'Proxy' },
    { url: 'https://prowlarr.dnb.ninja', name: 'Prowlarr' },
    { url: 'https://plex.dnb.ninja', name: 'Plex' },
    { url: 'https://lidarr.dnb.ninja', name: 'Lidarr' },
    { url: 'https://db.dnb.ninja/phpmyadmin', name: 'phpMyAdmin' },
    { url: 'https://db.dnb.ninja/webmin', name: 'Webmin' }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.dbStatus} style={{ backgroundColor: dbStatus === 'online' ? 'green' : 'red' }}>
        Database Status: {dbStatus}
      </div>
      <div className={styles.links}>
        {links.map(link => (
          <div key={link.url} className={styles.linkItem}>
            <img src={`https://www.google.com/s2/favicons?domain=${link.url}`} alt={`${link.name} logo`} />
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
