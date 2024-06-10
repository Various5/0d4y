import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Redirect here on error
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      console.log('JWT callback:', token, user); // Debugging line
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      console.log('Session callback:', session, token); // Debugging line
      return session;
    },
  },
  debug: true, // Enable debug mode
});
