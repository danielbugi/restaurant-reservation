import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useUserContext } from '../context/UserContext';
import { url } from '../data';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      alert('password or username is incorrect');
      console.log(response);
    } else {
      response.json().then((user) => {
        setUserInfo(user);
        setRedirect(true);
      });
    }
  };

  if (redirect) return <Navigate to={'/dashboard'} />;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h3>Please login</h3>
        <div className="input-con">
          <label htmlFor="username">username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-con">
          <label htmlFor="">password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          login
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  background: #151515;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    color: #fff;
    text-align: center;
    margin-bottom: 1rem;
  }
  .input-con {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    justify-items: center;
  }
`;
export default LoginPage;
