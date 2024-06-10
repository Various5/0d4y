// pages/auth/signin.js
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
