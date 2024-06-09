import { getSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';

export default function CreatePost({ session }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  if (!session) {
    return <p>You must be signed in to create a blog post.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/create-post', {
        title,
        content,
        featured_image: featuredImage,
      }, {
        headers: {
          Authorization: `Bearer ${session.token}`, // Ensure session token is passed correctly
        },
      });
      if (response.status === 200) {
        // Reset form or show success message
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <label>
        Featured Image URL:
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
        />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
