import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Games.module.css'; // Correct path to the CSS module

export default function Games() {
  const [showGame, setShowGame] = useState(false);
  const [currentGame, setCurrentGame] = useState('');

  const handleOpenGame = (game) => {
    setCurrentGame(game);
    setShowGame(true);
  };

  const handleCloseGame = (event) => {
    if (event.key === 'Escape') {
      setShowGame(false);
      setCurrentGame('');
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
      <button onClick={() => handleOpenGame('brickbreaker')}>Play Brick Breaker</button>
      <button onClick={() => handleOpenGame('marioclone')}>Play Mario Clone</button>
      {showGame && (
        <div className={styles.overlay}>
          <iframe src={`/games/${currentGame}/index.html`} className={styles.gameFrame}></iframe>
        </div>
      )}
    </Layout>
  );
}
