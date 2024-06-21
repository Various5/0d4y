import { useEffect, useState } from 'react';

const DbStatus = () => {
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    // You need to implement an API endpoint that returns the status of your database
    fetch('/api/db-status')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch((error) => setStatus('Offline'));
  }, []);

  return (
    <div>
      <h1>Database Status</h1>
      <p>Status: {status}</p>
    </div>
  );
};

export default DbStatus;
