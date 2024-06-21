import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/create-post">Create Post</Link></li>
          <li><Link href="/zerodays">0-Days</Link></li>
          {isLoggedIn && <li><Link href="/network-tools">Network Tools</Link></li>}
          {isLoggedIn && <li><Link href="/domain-tools">Domain Tools</Link></li>}
          {isLoggedIn && <li><Link href="/malware">Malware</Link></li>}
          {isLoggedIn && <li><Link href="/phishing">Phishing</Link></li>}
          {isLoggedIn && <li><Link href="/ransomware">Ransomware</Link></li>}
          {isLoggedIn && <li><Link href="/spoofing">Spoofing</Link></li>}
          {isLoggedIn && <li><Link href="/adware">Adware</Link></li>}
          {isLoggedIn && <li><Link href="/brute-force">Brute Force</Link></li>}
          {isLoggedIn && <li><Link href="/leaked-stuff">Leaked Stuff</Link></li>}
        </ul>
      </nav>
      <style jsx>{`
        header {
          background: #333;
          color: white;
          padding: 1em;
        }
        nav ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
          padding: 0;
          margin: 0;
        }
        nav ul li {
          margin: 0 1em;
        }
        nav ul li a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
