import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const SuccessMsg = () => {
  return (
    <Wrapper className="success-msg">
      <h2>
        Thanks! The reservation has sent to the restaurant /n and will contact
        with you soon!
      </h2>
      <Link to="/" className="button">
        Home page
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 20rem;
  width: 45rem;
  background: #494949;
  margin-top: 4rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    color: #fff;
    margin-bottom: 2rem;
  }
`;
export default SuccessMsg;
