import React from 'react';
import Link from 'next/link';

const Header = ({ isLoggedIn }) => (
  <header>
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        {isLoggedIn && <li><Link href="/create-post">Create Post</Link></li>}
        <li><Link href="/0-days">0-Days</Link></li>
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
  </header>
);

export default Header;
