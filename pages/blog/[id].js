import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Post.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <img src={post.featured_image} alt={post.title} className={styles.featuredImage} />
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}
