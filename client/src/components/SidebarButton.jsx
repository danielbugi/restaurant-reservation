import { FaBars } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

const SidebarButton = () => {
  const { openSidebar } = useAppContext();
  return (
    <div className="sidebar-btn-con">
      <FaBars className="sidebar-btn" onClick={openSidebar} />
    </div>
  );
};
export default SidebarButton;
