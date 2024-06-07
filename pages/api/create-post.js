// pages/api/create-post.js
import { getSession } from 'next-auth/react';
import db from '../../db';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'You must be signed in to create a blog post.' });
  }

  if (req.method === 'POST') {
    const { title, content, featured_image } = req.body;

    // Perform your database operations here
    db.query(
      'INSERT INTO posts (title, content, featured_image, user_id) VALUES (?, ?, ?, ?)',
      [title, content, featured_image, session.user.id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Post created successfully' });
      }
    );
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
