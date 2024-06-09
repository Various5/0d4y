import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '../../../db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          console.log('Connecting to database...');
          const [user] = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [credentials.username], (err, results) => {
              if (err) {
                console.error('Database error:', err);
                reject(err);
              }
              console.log('Database results:', results);
              resolve(results);
            });
          });

          if (!user) {
            console.log('User not found');
            return null;
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.log('Invalid password');
            return null;
          }

          console.log('Login successful:', user);
          return { id: user.id, name: user.username, email: user.email };
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('Session callback:', token);
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      console.log('JWT callback:', user);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  debug: true,
});
