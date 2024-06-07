// pages/api/auth/register.js
import bcrypt from 'bcryptjs';
import db from '../../../db';

export default async (req, res) => {
  const { username, password, email } = req.body;

  // Check if the user already exists
  const existingUser = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });

  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  await new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  res.status(200).json({ message: 'User registered successfully' });
};
