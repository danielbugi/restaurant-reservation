import { styled } from 'styled-components';
import { bgImages } from '../data';
import ReservationForm from '../components/ReservationForm';

const ReservationPage = () => {
  return (
    <Wrapper>
      <main>
        <div className="hero-img">
          <img src={bgImages[0]} alt="steak" />
        </div>
        <ReservationForm />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  background: #151515;
  main {
    width: 50%;
    margin: 0 auto;
    padding-top: 6rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .hero-img {
      overflow: hidden;
      width: 100%;
      margin-top: 2rem;
      border-radius: 15px;
      img {
        width: 100%;
        height: 20rem;
        object-fit: cover;
      }
    }
  }
  @media screen and (max-width: 620px) {
    main {
      width: 90vw;
    }
  }
`;
export default ReservationPage;
