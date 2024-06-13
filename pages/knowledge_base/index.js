import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/KnowledgeBase.module.css';

export default function KnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/knowledge_base', {
          params: {
            search,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [search]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Knowledge Base</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />
      <div className={styles.articles}>
        {articles.map((article) => (
          <div key={article.id} className={styles.article}>
            <h2>{article.title}</h2>
            <p>{article.content.slice(0, 100)}...</p>
            <button onClick={() => window.location.href = `/knowledge_base/${article.id}`} className={styles.readMore}>
              Read more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
