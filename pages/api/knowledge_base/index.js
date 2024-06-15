import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [articles] = await db.query('SELECT * FROM knowledge_base_articles');
      res.status(200).json(articles);
    } catch (error) {
      console.error('Database error during article retrieval:', error);
      res.status(500).json({ message: 'Failed to load knowledge base articles', error: error.message });
    }
  } else if (req.method === 'POST') {
    const { title, content, tags } = req.body;

    try {
      const [result] = await db.query(
        'INSERT INTO knowledge_base_articles (title, content) VALUES (?, ?)',
        [title, content]
      );

      if (tags && tags.length > 0) {
        const tagQueries = tags.split(',').map(tag => 
          db.query(
            'INSERT INTO knowledge_base_tags (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
            [tag.trim()]
          )
        );

        await Promise.all(tagQueries);
      }

      res.status(200).json({ message: 'Article created successfully', articleId: result.insertId });
    } catch (error) {
      console.error('Database error during article insertion:', error);
      res.status(500).json({ message: 'Failed to create article', error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
