import db from '../../db';

export default async function handler(req, res) {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'offline' });
    }
    res.status(200).json({ status: 'online' });
  });
}
