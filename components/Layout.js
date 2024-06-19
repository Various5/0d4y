import FuturisticSphereMenu from './FuturisticSphereMenu';

const Layout = ({ children }) => {
  return (
    <>
      <FuturisticSphereMenu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
