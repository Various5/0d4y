import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
require('dotenv').config();

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: 'Admin', email: 'admin@example.com' };
        
        if (credentials.username === 'admin' && credentials.password === 'password') {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
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
  }
});
