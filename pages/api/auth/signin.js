import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      console.log('SignIn result:', result);

      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to sign in');
      console.error('SignIn error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
