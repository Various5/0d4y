import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

// Dynamically import the Quill editor
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreatePost({ session: serverSession }) {
  const { data: session, status } = useSession();
  const [dbStatus, setDbStatus] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) signIn(); // Redirect to sign-in page if not authenticated
  }, [session, status]);

  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        const response = await axios.get('/api/db-status');
        setDbStatus(response.data.connected);
      } catch (error) {
        setDbStatus(false);
      }
    };

    checkDbStatus();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

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
      });

      console.log('Create post response:', response);

      if (response.status === 200) {
        // Reset form or show success message
      }
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <div>
        <span>Database Status: </span>
        <span style={{ color: dbStatus ? 'green' : 'red' }}>
          {dbStatus ? 'Connected' : 'Not Connected'}
        </span>
      </div>
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
          <ReactQuill value={content} onChange={setContent} />
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
    </div>
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
