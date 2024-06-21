import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default MyApp;
