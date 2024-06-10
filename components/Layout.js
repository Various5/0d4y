import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      const menuElement = document.querySelector(`.${styles.menu}`);
      const isClickInsideMenu = menuElement && menuElement.contains(event.target);

      if (!isClickInsideMenu && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button onClick={toggleMenu} className={styles.hamburger}>
          ☰
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          {status === 'unauthenticated' && (
            <>
              <li><Link href="/auth/signin">Login</Link></li>
            </>
          )}
          {status === 'authenticated' && (
            <>
              <li><Link href="/tools">Tools</Link></li>
              <li><Link href="/downloads">Downloads</Link></li>
              <li><Link href="/0d4ys">0D4Y's</Link></li>
              <li><Link href="/iptools">IP-Tools</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/profile">Profile</Link></li>
              <li className={styles.hasSubmenu}>
                <button className={styles.submenuButton}>
                  Admin Tools
                </button>
                <ul className={styles.submenu}>
                  <li><Link href="/admin/create-post">Create Blog Post</Link></li>
                </ul>
              </li>
              <li>
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
