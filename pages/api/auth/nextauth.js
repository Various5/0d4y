// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
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
    secret: 'brayg2f/UfmDG3BsSJV7bZ3gfKrDRmB6Y9uDwoKAXb7Elyiqph2IDrIKKh33mQREDPABrnyWmcUZhrCA4lMVyh55ieZcvAWCaZ23JqsQ0W5OMmUBazv2c/23uQGu3wiOVa7kaqhogYAuOIb2ksiuQL93vrfvGdQbrQPUzWRXeg6GeCZ8UXC/oesvgpeZuZoT6+tnpGjr/jzUWdwFwWDp7iO0YgwTFzcAryIapldsV7W2ZQ2n7E7c6sW0nmK/ms0Kue4eJ0m5D+k7akchKU+p99UJtuTKhwh/TzlkppcDW5dASZafWpLUp57XFHeeIonfNZWo0Zlfkhmh2kmK95TJAQ==',
  },
  pages: {
    signIn: '/auth/signin',
  }
});
