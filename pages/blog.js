import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Blog.module.css'; // Adjusted the path

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts', {
          params: {
            search,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [search]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2>{post.title}</h2>
            <img src={post.featured_image} alt={post.title} className={styles.featuredImage} />
            <p>{post.content.slice(0, 100)}...</p>
            <button onClick={() => window.location.href = `/blog/${post.id}`} className={styles.readMore}>
              Read more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
