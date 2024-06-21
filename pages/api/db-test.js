// pages/api/db-test.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Test the database connection by running a simple query
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
