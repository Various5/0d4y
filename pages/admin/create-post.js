import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default function CreatePost({ session: serverSession }) {
  const [session, setSession] = useState(serverSession);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
      console.log('Session on client-side:', currentSession); // Debugging line
    };

    if (!serverSession) {
      fetchSession();
    }
  }, [serverSession]);

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
        withCredentials: true,
      });

      console.log('Create post response:', response); // Debugging line

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

  console.log('Session in getServerSideProps:', session); // Debugging line

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
