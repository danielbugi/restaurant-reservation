import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarButton from './SidebarButton';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <SidebarButton />
      <Outlet />
    </>
  );
};
export default Layout;
