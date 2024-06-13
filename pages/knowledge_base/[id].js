import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/Article.module.css';

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`/api/knowledge_base/${id}`);
          setArticle(response.data);
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </div>
  );
}
