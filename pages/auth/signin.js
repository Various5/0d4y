import { signIn } from 'next-auth/react';
import styles from './Auth.module.css';

const SignIn = () => {
  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <button className={styles.button} onClick={() => signIn('google')}>Sign in with Google</button>
      <button className={styles.button} onClick={() => signIn('github')}>Sign in with GitHub</button>
    </div>
  );
};

export default SignIn;
