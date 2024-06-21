import { useSession, signIn } from 'next-auth/react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!session) {
      signIn();
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
