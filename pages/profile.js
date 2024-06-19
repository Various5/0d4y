import { useSession } from 'next-auth/react';
import styles from '../styles/profile.module.css';

const Profile = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in. Please log in to view your profile.</p>;
  }

  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <img src={session.user.image} alt="Profile Image" />
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default Profile;
