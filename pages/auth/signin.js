import { signIn } from 'next-auth/react';

const SignIn = () => {
  const handleSignIn = (provider) => {
    console.log(`Signing in with ${provider}`); // Debugging line
    signIn(provider);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => handleSignIn('google')}>Sign in with Google</button>
      <button onClick={() => handleSignIn('github')}>Sign in with GitHub</button>
    </div>
  );
};

export default SignIn;
