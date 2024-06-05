import { useEffect, useState } from 'react';

export default function SpaceInvader() {
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [aliens, setAliens] = useState([]);
  const [position, setPosition] = useState(225); // Start in the center
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [alienDirection, setAlienDirection] = useState(1); // 1 for right, -1 for left
  const [explosions, setExplosions] = useState([]);

  useEffect(() => {
    initAliens();
    const gameLoop = setInterval(updateGame, 100); // Slowed down for better gameplay
    window.addEventListener('keydown', move);
    window.addEventListener('keyup', stopMove);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', move);
      window.removeEventListener('keyup', stopMove);
    };
  }, []);

  const move = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (event.key === 'ArrowLeft') {
        setPosition((prev) => Math.max(prev - 15, 0));
      } else if (event.key === 'ArrowRight') {
        setPosition((prev) => Math.min(prev + 15, 450));
      }
    } else if (event.key === ' ') {
      shootBullet(position);
    }
  };

  const stopMove = () => {
    // This function can be used to stop movement if you implement continuous movement on keydown
  };

  const shootBullet = (position) => {
    setBullets((prevBullets) => [...prevBullets, { x: position + 22.5, y: 480 }]);
  };

  const enemyShoot = () => {
    const shootingAlien = aliens[Math.floor(Math.random() * aliens.length)];
    if (shootingAlien) {
      setEnemyBullets((prevBullets) => [...prevBullets, { x: shootingAlien.x + 15, y: shootingAlien.y + 20 }]);
    }
  };

  const initAliens = () => {
    let initialAliens = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 10; col++) {
        initialAliens.push({ x: col * 40 + 50, y: row * 40 });
      }
    }
    setAliens(initialAliens);
  };

  const updateGame = () => {
    updateBullets();
    updateEnemyBullets();
    updateAliens();
    updateExplosions();
    if (Math.random() < 0.01) {
      enemyShoot();
    }
  };

  const updateBullets = () => {
    setBullets((prevBullets) =>
      prevBullets.map((bullet) => ({ ...bullet, y: bullet.y - 10 })).filter((bullet) => bullet.y > 0)
    );
    checkCollisions();
  };

  const updateEnemyBullets = () => {
    setEnemyBullets((prevBullets) =>
      prevBullets.map((bullet) => ({ ...bullet, y: bullet.y + 5 })).filter((bullet) => bullet.y < 600)
    );
    checkEnemyBulletCollisions();
  };

  const updateAliens = () => {
    let moveDown = false;
    setAliens((prevAliens) => {
      return prevAliens.map((alien) => {
        let newX = alien.x + alienDirection * 10;
        if (newX < 0 || newX > 470) {
          setAlienDirection(alienDirection * -1);
          moveDown = true;
        }
        return { ...alien, x: newX };
      });
    });

    if (moveDown) {
      setAliens((prevAliens) =>
        prevAliens.map((alien) => ({ ...alien, y: alien.y + 20 }))
      );
    }

    if (aliens.some((alien) => alien.y > 480)) {
      setLives((prevLives) => prevLives - 1);
      if (lives <= 1) {
        setGameOver(true);
      }
    }

    if (aliens.length === 0) {
      initAliens();
    }
  };

  const updateExplosions = () => {
    setExplosions((prevExplosions) =>
      prevExplosions.map((explosion) => ({ ...explosion, duration: explosion.duration - 1 }))
      .filter((explosion) => explosion.duration > 0)
    );
  };

  const checkCollisions = () => {
    let newBullets = bullets;
    let newAliens = aliens;

    newBullets.forEach((bullet, bIndex) => {
      newAliens.forEach((alien, aIndex) => {
        if (bullet.x > alien.x && bullet.x < alien.x + 30 && bullet.y > alien.y && bullet.y < alien.y + 30) {
          newBullets.splice(bIndex, 1);
          newAliens.splice(aIndex, 1);
          setScore((prevScore) => prevScore + 10);
          setExplosions((prevExplosions) => [...prevExplosions, { x: alien.x, y: alien.y, duration: 20 }]);
        }
      });
    });

    setBullets(newBullets);
    setAliens(newAliens);
  };

  const checkEnemyBulletCollisions = () => {
    let newEnemyBullets = enemyBullets;

    newEnemyBullets.forEach((bullet, bIndex) => {
      if (bullet.x > position && bullet.x < position + 50 && bullet.y > 450 && bullet.y < 500) {
        newEnemyBullets.splice(bIndex, 1);
        setLives((prevLives) => prevLives - 1);
        if (lives <= 1) {
          setGameOver(true);
        }
      }
    });

    setEnemyBullets(newEnemyBullets);
  };

  return (
    <div className="game">
      <div className="spaceship" style={{ left: position + 'px' }}></div>
      {aliens.map((alien, index) => (
        <div key={index} className="alien" style={{ top: alien.y + 'px', left: alien.x + 'px' }}></div>
      ))}
      {bullets.map((bullet, index) => (
        <div key={index} className="bullet" style={{ top: bullet.y + 'px', left: bullet.x + 'px' }}></div>
      ))}
      {enemyBullets.map((bullet, index) => (
        <div key={index} className="enemyBullet" style={{ top: bullet.y + 'px', left: bullet.x + 'px' }}></div>
      ))}
      {explosions.map((explosion, index) => (
        <div key={index} className="explosion" style={{ top: explosion.y + 'px', left: explosion.x + 'px' }}></div>
      ))}
      <div className="score">Score: {score}</div>
      <div className="lives">Lives: {lives}</div>
      {gameOver && <div className="game-over">Game Over</div>}
      <style jsx>{`
        .game {
          position: relative;
          width: 500px;
          height: 600px;
          margin: 0 auto;
          background-color: black;
        }
        .spaceship {
          position: absolute;
          bottom: 10px;
          width: 50px;
          height: 50px;
          background-image: url('/spaceship.gif');
          background-size: cover;
        }
        .alien {
          position: absolute;
          width: 30px;
          height: 30px;
          background-image: url('/alien.png');
          background-size: cover;
        }
        .bullet, .enemyBullet {
          position: absolute;
          width: 5px;
          height: 20px;
          background-color: yellow;
        }
        .enemyBullet {
          background-color: red;
        }
        .bullet {
          animation: bulletEffect 0.5s linear infinite;
        }
        @keyframes bulletEffect {
          0% {
            box-shadow: 0 0 5px yellow;
          }
          100% {
            box-shadow: 0 0 20px yellow;
          }
        }
        .explosion {
          position: absolute;
          width: 30px;
          height: 30px;
          background-image: url('/explosion.png'); /* Placeholder for explosion image */
          background-size: cover;
        }
        .score, .lives, .game-over {
          color: white;
          position: absolute;
          top: 10px;
          left: 10px;
        }
        .game-over {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}
