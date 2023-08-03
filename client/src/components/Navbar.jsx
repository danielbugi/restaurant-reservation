import { styled } from 'styled-components';
import hamburger from '../public/hamburger.svg';
import { links } from '../data';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Navbar = () => {
  const { userInfo } = useUserContext();

  return (
    <Wrapper>
      <main>
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
        <div className="nav-title">
          <img src={hamburger} alt="" style={{ height: '45px' }} />
          <h3>The Restaurant</h3>
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 6rem;
  width: 100%;
  background: rgba(37, 37, 37, 0.8);
  color: #fff;
  position: fixed;
  z-index: 999;
  main {
    height: 100%;
    max-width: 1620px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
  .nav-title {
    text-align: center;
    h3 {
      font-size: 1.5rem;
    }
  }

  .links a {
    color: #fff;
    font-size: 1.2rem;
    margin: 0 1rem;
  }

  @media screen and (max-width: 620px) {
    display: none;
  }
`;
export default Navbar;
