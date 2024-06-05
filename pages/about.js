import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <h1>About Us</h1>
      <div className="about-content">
        <img src="/path/to/placeholder-image.jpg" alt="Placeholder" />
        <p>
          XYZ is a modern, innovative platform designed to simplify your life. We offer a wide range of tools and services to help you manage your daily tasks more efficiently.
        </p>
        <p>
          Our team is composed of dedicated professionals who are passionate about technology and innovation. We're constantly working to improve and expand our platform to better serve our users.
        </p>
      </div>
    </Layout>
  );
}