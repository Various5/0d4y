import { useState } from 'react';
import styles from './HamburgerMenu.module.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.hamburgerMenu}>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        &#9776;
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/dashboard">Dashboard</a>
          {/* Add more links as needed */}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
