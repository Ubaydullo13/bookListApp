import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home/';
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      if (location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [location.pathname, navigate]);

  function ProtectedRoute({ children, redirect = '/login', isAuthentication }) {
    if (!isAuthentication) {
      navigate(redirect);
    }
    return children;
  }

  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthentication={token ? true : false} redirect="/login">
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
