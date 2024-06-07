// pages/api/auth/manage-user.js
import db from '../../../db';

export default async (req, res) => {
  const { userId, active } = req.body;

  await new Promise((resolve, reject) => {
    db.query('UPDATE users SET active = ? WHERE id = ?', [active, userId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  res.status(200).json({ message: 'User updated successfully' });
};
