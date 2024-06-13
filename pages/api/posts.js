import { getSession } from 'next-auth/react';
import db from '../../db';

export default async function handler(req, res) {
  const session = await getSession({ req });

  console.log('Session in API route:', session); // Debugging line
  console.log('Request headers:', req.headers); // Debugging line
  console.log('Request method:', req.method); // Debugging line

  if (req.method === 'POST') {
    if (!session) {
      console.error('No session found');
      return res.status(401).json({ message: 'You must be signed in to create a blog post.' });
    }

    const { title, content, featured_image } = req.body;

    console.log('Received POST data:', { title, content, featured_image }); // Debugging line

    if (!title || !content || !session.user.id) {
      console.error('Missing required fields');
      return res.status(400).json({ message: 'Title, content, and user ID are required.' });
    }

    try {
      db.query(
        'INSERT INTO posts (title, content, featured_image, user_id) VALUES (?, ?, ?, ?)',
        [title, content, featured_image, session.user.id],
        (err, results) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
          }
          res.status(200).json({ message: 'Post created successfully' });
        }
      );
    } catch (error) {
      console.error('Server error during database operation:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else if (req.method === 'GET') {
    const { search } = req.query;

    try {
      let query = 'SELECT * FROM posts';
      let queryParams = [];

      if (search) {
        query += ' WHERE title LIKE ? OR content LIKE ?';
        queryParams = [`%${search}%`, `%${search}%`];
      }

      query += ' ORDER BY created_at DESC';

      db.query(query, queryParams, (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Server error during database operation:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
