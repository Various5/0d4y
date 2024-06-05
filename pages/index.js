import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <img src="/images/header.jpg" alt="Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1>Ahoy, matey! Welcome aboard 0d4y.ch!</h1>
        <p>
          The most swashbuckling platform on the seven seas! We've got a treasure trove of tools, news, and services to help ye navigate the choppy waters of daily life.
        </p>
        <p>
          So hoist the anchor and set sail for adventure with us at 0d4y.ch! Whether you're in search of the latest news, productivity tools, or avenues to connect with others, 0d4y.ch has got you covered. Dive into our site to discover more about what we can offer you.
        </p>
        <p>
          We're continually updating and broadening our services, so make sure to visit often for the newest tools, news, and features. We're excited to welcome you to the 0d4y.ch community!
        </p>
        <p>
          Feel free to reach out to us via our <a href="/about">contact page</a> if you have any questions or suggestions.
        </p>
      </div>
    </Layout>
  );
}