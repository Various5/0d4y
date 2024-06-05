import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      var menuElement = document.querySelector('.menu');
      var hamburgerElement = document.querySelector('.hamburger');

      var isClickInsideMenu = menuElement && menuElement.contains(event.target);
      var isClickOnHamburger = hamburgerElement && hamburgerElement.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen]); // Dependency array includes isOpen so the effect runs whenever isOpen changes

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button onClick={toggleMenu} className={styles.hamburger}>
          ☰
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tools">Tools</Link>
          </li>
          <li>
            <Link href="/downloads">Downloads</Link>
          </li>
          <li>
            <Link href="/0d4ys">0D4Y's</Link>
          </li>
          <li>
            <Link href="/iptools">IP-Tools</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          {/* ... other menu items ... */}
        </ul>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}