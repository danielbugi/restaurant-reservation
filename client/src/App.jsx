import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import ReservationPage from './pages/ReservationPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
