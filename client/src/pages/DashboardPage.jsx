import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { url } from '../data';
import Loader from '../components/Loader';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}/reservation`);
      const result = await res.json();
      setReservations(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <h2>Welcome to the reservation portal</h2>
      <div className="main-con">
        <div className="header-con">
          <div></div>
          <div>name</div>
          <div>phone</div>
          <div>date</div>
          <div>time</div>
          <div>number of people</div>
        </div>
        <ul className="res-con">
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            reservations.map((item, i) => {
              const { _id, date, name, people, phone, time } = item;
              return (
                <li className="res-item" key={_id}>
                  <span>{i + 1}</span>
                  <span>{name}</span>
                  <span>{phone}</span>
                  <span>{date.split('T')[0]}</span>
                  <span>{time}</span>
                  <span>{people}</span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  background: #151515;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 6rem;
  h2 {
    color: #fff;
    margin: 2rem 0;
  }
  .main-con {
    width: 80%;
    background: #9b9b9b;
    padding: 2rem 4rem;
    min-height: 25rem;
    border-radius: 15px;
  }
  .header-con {
    display: block;
    width: 100%;
    background: #d7d7d7;
    display: flex;
    justify-content: space-evenly;
    border-radius: 5px;
  }

  .header-con div {
    padding: 1.2rem 2.5rem;
    width: 100%;
    text-transform: capitalize;
    font-weight: bold;
  }

  .res-con {
    width: 100%;
  }

  .res-con li {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 0.5rem;
    border-bottom: 1px solid #5d5d5d;
    &:hover {
      background: #b5b5b5;
    }
  }
  .res-con li span {
    display: block;
    width: 100%;
    text-align: start;
    padding: 0 2.5rem;
  }

  .res-con li span:first-child,
  .header-con div:first-child {
    width: 5rem;
  }

  .res-con li .num-item {
    width: 15px;
  }

  @media screen and (max-width: 620px) {
    .main-con {
      width: 100%;
      padding: 2rem 0;
    }
    .header-con {
      justify-content: space-between;
    }
    .header-con div {
      width: auto;
      padding: 0.3rem;
      font-size: 14px;
    }
    .res-con li span {
      padding: 0;
      text-align: center;
    }

    .res-con li span:first-child,
    .header-con div:first-child {
      width: 3rem;
    }
  }
`;
export default DashboardPage;
