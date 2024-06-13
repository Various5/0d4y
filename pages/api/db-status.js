import db from '../../db';

export default async function handler(req, res) {
  try {
    db.query('SELECT 1', (err, results) => {
      if (err) {
        return res.status(500).json({ connected: false });
      }
      res.status(200).json({ connected: true });
    });
  } catch (error) {
    res.status(500).json({ connected: false });
  }
}
