import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          setPost(response.data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.featured_image} alt={post.title} style={{ width: '300px' }} />
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}
