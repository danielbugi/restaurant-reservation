import Header from '../components/Header';
import hamburger from '../public/hamburger.svg';
import styled from 'styled-components';

import { bgImages } from '../data';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import SidebarButton from '../components/SidebarButton';

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [backgrounds, setBackgrounds] = useState(bgImages);
  const [currentBg, setCurrentBg] = useState(0);

  const changeBg = () => {
    setCurrentBg((oldBg) => {
      const result = (oldBg + 1) % backgrounds.length;
      return result;
    });
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      changeBg();
    }, 10000);
    return () => {
      clearInterval(sliderId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBg]);

  return (
    <Wrapper>
      <SidebarButton />

      <div className="background-container">
        {bgImages.map((item, i) => {
          return (
            <img
              src={item}
              key={i}
              className="background"
              style={{
                opacity: i === currentBg ? 1 : 0,
              }}
            />
          );
        })}
        <main className="hero">
          <div className="img-con">
            <img src={hamburger} alt="" />
          </div>
          <br />
          <h1>the restaurant</h1>
          <Header />
          <Link to={'/reservation'} className="button">
            Book a table
          </Link>
        </main>
      </div>
      <Link to={'/dashboard'} className="dashboard-link">
        Staff Portal &rarr;
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  .background-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .background {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
      z-index: -1;
      transition: 5s ease-in-out;
    }
  }

  main {
    background: rgba(112, 112, 112, 0.9);
    display: block;
    width: 35rem;
    padding: 4rem 2rem;
    text-align: center;
    border-radius: 10px;
  }
  .img-con img {
    height: 15rem;
  }

  br {
    width: 80%;
    height: 1px;
    background-color: #eee46f;
    display: block;
    margin: 1rem 0;
  }

  main h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    color: #eee46f;
  }

  .button {
    display: inline-block;
    margin-top: 1rem;
  }

  .dashboard-link {
    position: fixed;
    bottom: 10px;
    left: 10px;
    color: #eee46f;
    text-decoration: underline;
    font-size: 2rem;
    font-weight: bold;
  }
  @media screen and (max-width: 620px) {
    .img-con img {
      height: 8rem;
    }
    main {
      width: 90vw;
      h1 {
        font-size: 1.8rem;
      }
    }
  }
`;

export default HomePage;
