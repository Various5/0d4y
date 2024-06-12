export default function Home() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <img src="/images/header.jpg" alt="Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1>Welcome to 0d4y.ch!</h1>
        <p>
          Welcome to 0d4y.ch, your one-stop platform for a wide range of tools, news, and services. Whether you're looking for the latest updates, productivity tools, or ways to connect with others, 0d4y.ch has something for everyone.
        </p>
        <p>
          Dive into our comprehensive collection of resources designed to help you navigate your daily challenges with ease. Our platform is continuously evolving, bringing you the most current tools, news, and features.
        </p>
        <p>
          Stay tuned for regular updates as we expand our offerings. We're thrilled to have you as part of the 0d4y.ch community and look forward to providing you with valuable content and services.
        </p>
        <p>
          If you have any questions or suggestions, please don't hesitate to reach out to us through our <a href="/about">contact page</a>.
        </p>
      </div>
    </div>
  );
}
