import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {session ? (
        <p>Signed in as {session.user.email}</p>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}
