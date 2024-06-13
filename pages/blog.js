import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.featured_image} alt={post.title} style={{ width: '100px' }} />
            <p>{post.content.slice(0, 100)}...</p>
            <button onClick={() => window.location.href = `/blog/${post.id}`}>Read more</button>
          </div>
        ))}
      </div>
    </div>
  );
}
