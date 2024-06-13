import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post('/api/knowledge_base', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setTitle('');
        setContent('');
        setTags('');
        setFiles([]);
      }
    } catch (error) {
      console.error('Error creating article:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Create Knowledge Base Article</h1>
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
          Tags (comma separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <label>
          Files:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
}
