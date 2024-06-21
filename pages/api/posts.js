const express = require('express');
const connection = require('./db');

const router = express.Router();

router.post('/posts', async (req, res) => {
  const { content } = req.body;
  await connection.execute('INSERT INTO posts (content) VALUES (?)', [content]);
  res.json({ message: 'Post created successfully' });
});

router.get('/posts', async (req, res) => {
  const [rows] = await connection.execute('SELECT * FROM posts');
  res.json(rows);
});

module.exports = router;
