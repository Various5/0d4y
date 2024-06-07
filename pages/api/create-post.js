import db from '../../db';
import sanitizeHtml from 'sanitize-html';

export default (req, res) => {
  const { title, content, featured_image } = req.body;

  // Sanitize input
  const sanitizedTitle = sanitizeHtml(title);
  const sanitizedContent = sanitizeHtml(content);
  const sanitizedImage = sanitizeHtml(featured_image);

  const query = 'INSERT INTO posts (title, content, featured_image) VALUES (?, ?, ?)';
  db.query(query, [sanitizedTitle, sanitizedContent, sanitizedImage], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Post created successfully' });
    }
  });
};
