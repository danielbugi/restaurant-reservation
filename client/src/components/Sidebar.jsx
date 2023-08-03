import { styled } from 'styled-components';
import hamburger from '../public/hamburger.svg';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { links } from '../data';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Sidebar = () => {
  const { closeSidebar, showSidebar } = useAppContext();
  const { userInfo } = useUserContext();

  return (
    <Wrapper>
      <div
        className={showSidebar ? 'background show-sidebar' : 'background'}
        onClick={closeSidebar}
      >
        <div className="sidebar-header">
          <div className="close-btn">
            <FaTimes onClick={closeSidebar} />
          </div>
          <img src={hamburger} alt="" style={{ height: '45px' }} />
          <h3>The Restaurant</h3>
        </div>
        <ul className="links">
          {links.map((link) => {
            return (
              <Link key={link.id} to={link.url}>
                {link.text}
              </Link>
            );
          })}
          {userInfo && (
            <>
              <Link to={'/dashboard'}>Dashboard</Link>
              <a href="/">Logout</a>
            </>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  .background {
    height: 100vh;
    width: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    right: -100%;
    z-index: 10;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  .show-sidebar {
    right: 0;
  }

  .sidebar-header {
    text-align: center;
    position: relative;
    margin-top: 2rem;
  }
  .close-btn {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 2rem;
    cursor: pointer;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-top: 4rem;
  }
  ul a {
    font-size: 1.2rem;
  }
`;

export default Sidebar;
