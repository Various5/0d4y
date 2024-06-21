import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
