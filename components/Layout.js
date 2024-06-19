import CubeMenu from './CubeMenu';

const Layout = ({ children }) => {
  return (
    <>
      <CubeMenu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
