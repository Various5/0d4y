import db from '../../db';

export default (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};
