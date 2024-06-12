import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Games.module.css';

export default function Games() {
  const [showGame, setShowGame] = useState(false);
  const [gameUrl, setGameUrl] = useState('');

  const handleOpenGame = (url) => {
    setGameUrl(url);
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
      <button onClick={() => handleOpenGame('/games/brickbreaker/index.html')}>Play Brick Breaker</button>
      <button onClick={() => handleOpenGame('/games/marioclone/index.html')}>Play Mario Clone</button>
      <button onClick={() => handleOpenGame('/games/luckywheel/index.html')}>Play Lucky Wheel</button>
      <button onClick={() => handleOpenGame('/games/slotmachine/index.html')}>Play Slot Machine</button>
      <button onClick={() => handleOpenGame('/games/blackjack/index.html')}>Play Blackjack</button>
      <button onClick={() => handleOpenGame('/games/roulette/index.html')}>Play Roulette</button>
      {showGame && (
        <div className={styles.overlay}>
          <iframe src={gameUrl} className={styles.gameFrame}></iframe>
        </div>
      )}
    </Layout>
  );
}
