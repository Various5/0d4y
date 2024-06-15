import { getSession } from 'next-auth/react';
import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'You must be signed in to create a blog post.' });
    }

    const { title, content } = req.body;

    try {
      await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error('Database error during post insertion:', error);
      res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
