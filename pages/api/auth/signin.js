// pages/auth/signin.js
import { providers, signIn, getSession, csrfToken } from 'next-auth/client';
import { useEffect } from 'react';

export default function SignIn({ providers, csrfToken }) {
  return (
    <div>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(),
    csrfToken: await csrfToken(context)
  }
}
