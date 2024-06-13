import { useState, useEffect } from 'react';
import { useSession, signIn, getSession } from 'next-auth/react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const toolbarOptions = [
  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
  [{size: []}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1' }],
  ['link', 'image'],
  ['clean']
];

export default function CreatePost() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) signIn();
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', {
        title,
        content,
        featured_image: featuredImage,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setTitle('');
        setContent('');
        setFeaturedImage('');
      }
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You must be signed in to create a blog post.</p>;
  }

  return (
    <div>
      <h1>Create Post</h1>
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
          <ReactQuill value={content} onChange={setContent} modules={{ toolbar: toolbarOptions }} />
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
