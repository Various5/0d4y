import FuturisticMenu from './FuturisticMenu';

const Layout = ({ children }) => {
  return (
    <>
      <FuturisticMenu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
