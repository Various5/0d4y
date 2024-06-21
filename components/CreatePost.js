import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/posts', { content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Editor
        apiKey="oqhpmxp86fcd3ei6kn3injn2gf64l6pqftyb6f6amfdf6l5v"
        value={content}
        onEditorChange={handleEditorChange}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
