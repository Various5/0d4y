// components/NavBar.js
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        {status === 'unauthenticated' && (
          <>
            <li><Link href="/auth/signin">Login</Link></li>
            <li><Link href="/auth/register">Register</Link></li>
          </>
        )}
        {status === 'authenticated' && (
          <>
            <li><Link href="/profile">Profile</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><button onClick={() => signOut()}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
