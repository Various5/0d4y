import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
};

export default Profile;

export async function getServerSideProps() {
  return {
    props: {}, // Will be passed to the page component as props
  };
}
