import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './Auth.module.css';

const SignIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Add your registration logic here
    } else {
      await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Sign In'}</button>
      </form>
      <button onClick={() => signIn('google')}>Sign In with Google</button>
      <button onClick={() => signIn('github')}>Sign In with GitHub</button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Sign In' : 'No account? Register'}
      </button>
    </div>
  );
};

export default SignIn;
