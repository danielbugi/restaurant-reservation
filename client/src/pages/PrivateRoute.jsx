import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { userInfo } = useUserContext();
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default PrivateRoute;
