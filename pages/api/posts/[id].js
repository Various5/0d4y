import db from '../../../db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(results[0]);
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
