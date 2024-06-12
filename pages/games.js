import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Games.module.css'; // Create this CSS module for the overlay styles
import React, { useEffect } from 'react';

export default function Games() {
  const [showGame, setShowGame] = useState(false);

  const handleOpenGame = () => {
    setShowGame(true);
  };

  const handleCloseGame = (event) => {
    if (event.key === 'Escape') {
      setShowGame(false);
    }
  };

  useEffect(() => {
    if (showGame) {
      window.addEventListener('keydown', handleCloseGame);
    } else {
      window.removeEventListener('keydown', handleCloseGame);
    }

    return () => {
      window.removeEventListener('keydown', handleCloseGame);
    };
  }, [showGame]);

  return (
    <Layout>
      <h1>Games</h1>
      <button onClick={handleOpenGame}>Play Brick Breaker</button>
      {showGame && (
        <div className={styles.overlay}>
          <iframe src="/games/brickbreaker/index.html" className={styles.gameFrame}></iframe>
        </div>
      )}
    </Layout>
  );
}
