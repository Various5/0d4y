// components/Layout.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (res?.ok) {
      router.reload();
    } else {
      console.error('Sign-in error', res?.error);
    }
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      var menuElement = document.querySelector(`.${styles.menu}`);
      var isClickInsideMenu = menuElement && menuElement.contains(event.target);

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
          <li>
            <Link href="/">Home</Link>
            {session && (
              <ul className={styles.submenu}>
                <li>
                  <Link href="/admin/create-post">Create Blog Post</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/blog">Blog</Link>
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
            <Link href="/auth/register">Register</Link>
          </li>
          <li className={styles.login}>
            {status === 'loading' ? (
              <div>Loading...</div>
            ) : session ? (
              <>
                <span>{session.user?.name || 'Guest'}</span>
                <button onClick={() => signOut()}>Sign Out</button>
              </>
            ) : (
              <form onSubmit={handleSignIn} className={styles.loginForm}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign In</button>
              </form>
            )}
          </li>
        </ul>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
