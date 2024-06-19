import { signIn } from 'next-auth/client';
import styles from '../../styles/signup.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <button className={styles.signUpButton} onClick={() => signIn('google')}>Sign up with Google</button>
      <button className={styles.signUpButton} onClick={() => signIn('github')}>Sign up with GitHub</button>
    </div>
  );
};

export default SignUp;
