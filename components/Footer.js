import React from 'react';
import Link from 'next/link';

const Footer = ({ isLoggedIn }) => (
  <footer>
    <ul>
      {!isLoggedIn ? <li><Link href="/login">Login</Link></li> : <li><Link href="/logout">Logout</Link></li>}
      {!isLoggedIn && <li><Link href="/register">Register</Link></li>}
      <li><Link href="/database-status">Database Status</Link></li>
      <li><Link href="/contact">Contact</Link></li>
      <li><Link href="/impressum">Impressum</Link></li>
      <li><Link href="/games">Games</Link></li>
    </ul>
  </footer>
);

export default Footer;
