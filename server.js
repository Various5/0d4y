const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');
const postRoutes = require('./api/posts');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use('/api/auth', authRoutes);
  server.use('/api', postRoutes);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
  });
});
