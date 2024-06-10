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
    error: '/auth/error', // Redirect here on error.
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      try {
        if (user) {
          token.id = user.id;
        }
        console.log('JWT callback:', token, user);
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        throw error;
      }
    },
    async session(session, token) {
      try {
        session.user.id = token.id;
        console.log('Session callback:', session, token);
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        throw error;
      }
    },
  },
  debug: true, // Enable debug mode
});
