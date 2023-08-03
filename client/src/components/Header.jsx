import { styled } from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <div className="line"></div>
      <p>
        food restaurant <span>&diams;</span> since 1988
      </p>
      <div className="line"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem 0;
  color: #eee46f;
  display: flex;
  align-items: center;
  justify-content: center;
  .line {
    height: 2px;
    width: 60px;
    background: #eee46f;
    margin: 10px;
  }
  p {
    text-transform: capitalize;
    font-size: 1.2rem;
  }
`;
export default Header;
