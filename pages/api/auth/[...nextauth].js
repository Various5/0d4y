import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: {  label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
  },
});
