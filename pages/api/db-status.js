import connection from '../../db';

export default async function handler(req, res) {
  try {
    await connection.query('SELECT 1');
    res.status(200).json({ status: 'online' });
  } catch (error) {
    res.status(500).json({ status: 'offline' });
  }
}
