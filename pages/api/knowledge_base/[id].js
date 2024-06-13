import db from '../../../db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM knowledge_base_articles WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json(results[0]);
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;

    try {
      db.query(
        'UPDATE knowledge_base_articles SET title = ?, content = ? WHERE id = ?',
        [title, content, id],
        (err) => {
          if (err) return res.status(500).json({ message: 'Database error', error: err });
          res.status(200).json({ message: 'Article updated successfully' });
        }
      );
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      db.query('DELETE FROM knowledge_base_articles WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Article deleted successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
