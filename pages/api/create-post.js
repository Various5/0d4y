import { getSession } from 'next-auth/react';
import db from '../../db';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'You must be signed in to create a blog post.' });
  }

  if (req.method === 'POST') {
    const { title, content, featured_image } = req.body;

    if (!title || !content || !session.user.id) {
      return res.status(400).json({ message: 'Title, content, and user ID are required.' });
    }

    try {
      db.query(
        'INSERT INTO posts (title, content, featured_image, user_id) VALUES (?, ?, ?, ?)',
        [title, content, featured_image, session.user.id],
        (err, results) => {
          if (err) {
            console.log('Database error:', err); // Debugging line
            return res.status(500).json({ message: 'Database error', error: err });
          }
          res.status(200).json({ message: 'Post created successfully' });
        }
      );
    } catch (error) {
      console.log('Server error:', error); // Debugging line
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
