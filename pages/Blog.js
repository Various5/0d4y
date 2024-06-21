import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} dangerouslySetInnerHTML={{ __html: post.content }}></div>
      ))}
    </div>
  );
};

export default Blog;
