import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Footer = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <footer>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><Link href="/auth/signin">Login</Link></li>
            <li><Link href="/auth/register">Register</Link></li>
          </>
        ) : (
          <li><Link href="/auth/signout">Logout</Link></li>
        )}
        <li>Database Status: <span id="db-status">Online</span></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/impressum">Impressum</Link></li>
        <li><Link href="/games">Games</Link></li>
      </ul>
      <style jsx>{`
        footer {
          background: #333;
          color: white;
          padding: 1em;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        footer ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
          padding: 0;
          margin: 0;
        }
        footer ul li {
          margin: 0 1em;
        }
        footer ul li a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
