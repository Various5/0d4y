import ArtisticMenu from './ArtisticMenu';

const Layout = ({ children }) => {
  return (
    <>
      <ArtisticMenu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
