import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Console() {
  const [consoleOutput, setConsoleOutput] = useState('');
  const [consoleInput, setConsoleInput] = useState('');

  useEffect(() => {
    setConsoleOutput('Welcome to the console. Here you can enter and execute commands.');
  }, []);

  const handleConsoleInput = (event) => {
    event.preventDefault();
    // Add logic here to execute the entered command
    setConsoleOutput(consoleOutput + '\n> ' + consoleInput);
    setConsoleInput('');
  };

  return (
    <Layout>
      <h1>Console</h1>
      <div style={{ backgroundColor: 'black', color: 'lime', padding: '10px', borderRadius: '5px' }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{consoleOutput}</pre>
        <form onSubmit={handleConsoleInput}>
          <input
            type="text"
            value={consoleInput}
            onChange={(e) => setConsoleInput(e.target.value)}
            style={{ width: '100%', color: 'lime', backgroundColor: 'black', border: 'none' }}
          />
        </form>
      </div>
    </Layout>
  );
}