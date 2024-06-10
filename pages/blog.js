// pages/blog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts').then(response => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <header>
        <h1>Blog</h1>
      </header>
      <main>
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.featured_image} alt={post.title} />
            <p>{post.content}</p>
          </article>
        ))}
      </main>
      <aside>
        <section>
          <h2>About</h2>
          <p>This is a blog about XYZ.</p>
        </section>
        <section>
          <h2>Recent Posts</h2>
          {/* List of recent posts */}
        </section>
        <section>
          <h2>Categories</h2>
          {/* List of categories */}
        </section>
        <section>
          <h2>Social Media</h2>
          {/* Social media links */}
        </section>
        <section>
          <h2>Search</h2>
          <input type="text" placeholder="Search..." />
        </section>
      </aside>
      <footer>
        <section>
          <h2>Contact</h2>
          {/* Contact information */}
        </section>
        <section>
          <h2>Privacy Policy</h2>
          {/* Privacy policy/terms of service */}
        </section>
        <section>
          <h2>Subscribe</h2>
          {/* Subscription form */}
        </section>
      </footer>
    </div>
  );
};

export default Blog;
