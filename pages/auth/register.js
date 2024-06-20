import { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './Auth.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
      </form>
      <button className={styles.button} onClick={() => signIn('google')}>Register with Google</button>
      <button className={styles.button} onClick={() => signIn('github')}>Register with GitHub</button>
    </div>
  );
};

export default Register;
