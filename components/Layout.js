import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

const isLoggingEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
    if (isLoggingEnabled) console.log('Menu toggled:', isOpen); // Conditional logging
  };

  useEffect(() => {
    const closeMenu = (event) => {
      const menuElement = document.querySelector(`.${styles.menu}`);
      const isClickInsideMenu = menuElement && menuElement.contains(event.target);

      if (!isClickInsideMenu && isOpen) {
        setIsOpen(false);
        if (isLoggingEnabled) console.log('Menu closed'); // Conditional logging
      }
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen]);

  useEffect(() => {
    if (status === 'authenticated') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the message after 3 seconds
    }
  }, [status]);

  if (isLoggingEnabled) {
    console.log('Session status:', status); // Conditional logging
    console.log('Session data:', session); // Conditional logging
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button onClick={toggleMenu} className={styles.hamburger}>
          ☰
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/games">Games</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/downloads">Downloads</Link></li>
          <li><Link href="/0d4ys">0D4Y's</Link></li>
          {status === 'unauthenticated' && (
            <li>
              <button onClick={() => signIn('google')}>Login</button>
            </li>
          )}
          {status === 'authenticated' && (
            <>
              <li><Link href="/tools">Tools</Link></li>

              <li><Link href="/iptools">IP-Tools</Link></li>
              <li><Link href="/profile">Profile</Link></li>
              <li><Link href="/create-post">Create Blog Post</Link></li>
              <li><button onClick={() => signOut()}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
      <main className={styles.main}>
        {showSuccessMessage && <div className={styles.successMessage}>Login successful!</div>}
        {children}
      </main>
    </div>
  );
}
