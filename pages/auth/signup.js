import { signIn } from 'next-auth/react';
import styles from './Auth.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <button className={styles.button} onClick={() => signIn('google')}>Sign up with Google</button>
      <button className={styles.button} onClick={() => signIn('github')}>Sign up with GitHub</button>
    </div>
  );
};

export default SignUp;
