import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from './Blog';
import CreatePost from '../components/CreatePost';
import NetworkTools from './network-tools';
import DomainTools from './domain-tools';
import Malware from './malware';
import Phishing from './phishing';
import Ransomware from './ransomware';
import Spoofing from './spoofing';
import Adware from './adware';
import BruteForce from './brute-force';
import LeakedStuff from './leaked-stuff';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Add logic to check if the user is logged in
  }, []);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Blog />
      </main>
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Home;
