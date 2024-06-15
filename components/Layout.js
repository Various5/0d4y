import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

const isLoggingEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        <ul className={styles.menu}>
          <li><Link href="/">Home</Link></li>
          <li className={styles.dropdown}>
            <Link href="/blog">Blog</Link>
            {status === 'authenticated' && (
              <ul className={styles.submenu}>
                <li><Link href="/create-post">Create Post</Link></li>
              </ul>
            )}
          </li>
          <li className={styles.dropdown}>
            <Link href="/knowledge_base">KB</Link>
            {status === 'authenticated' && (
              <ul className={styles.submenu}>
                <li><Link href="/create-knowledge">Create KB Article</Link></li>
              </ul>
            )}
          </li>
          <li><Link href="/games">Games</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/downloads">Downloads</Link></li>
          <li><Link href="/0d4ys">0D4Y's</Link></li>
          {status === 'authenticated' && (
            <>
              <li><Link href="/tools">Tools</Link></li>
              <li><Link href="/iptools">IP-Tools</Link></li>
              <li><Link href="/profile">Profile</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </>
          )}
        </ul>
      </nav>
      <main className={styles.main}>
        {showSuccessMessage && <div className={styles.successMessage}>Login successful!</div>}
        {children}
      </main>
      <footer className={styles.footer}>
        {status === 'unauthenticated' ? (
          <button onClick={() => signIn('google')}>Login</button>
        ) : (
          <button onClick={() => signOut()}>Logout</button>
        )}
      </footer>
    </div>
  );
}
