// pages/admin/create-post.js
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ session }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  if (!session) {
    return <p>You must be signed in to create a blog post.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/create-post', {
      title,
      content,
      featured_image: featuredImage,
    });
    if (response.status === 200) {
      // Reset form or show success message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Featured Image URL:
        <input type="text" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}

export default CreatePost;
