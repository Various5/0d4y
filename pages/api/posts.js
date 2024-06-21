import connection from '../../db';

export default async function handler(req, res) {
  const { content } = req.body;
  await connection.execute('INSERT INTO posts (content) VALUES (?)', [content]);
  res.json({ message: 'Post created successfully' });
}
