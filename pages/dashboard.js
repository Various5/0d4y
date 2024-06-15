import { useState, useEffect } from 'react';
import withAuth from '../utils/withAuth';

function Dashboard() {
  const [dbStatus, setDbStatus] = useState(false);

  useEffect(() => {
    async function fetchDbStatus() {
      const response = await fetch('/api/db-status');
      const result = await response.json();
      setDbStatus(result.status);
    }

    fetchDbStatus();
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
      <div>
        <h2>Database Status: {dbStatus ? 'Connected' : 'Disconnected'}</h2>
      </div>
      <div>
        {links.map(link => (
          <div key={link.url} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={`https://www.google.com/s2/favicons?domain=${link.url}`} alt={`${link.name} logo`} />
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
