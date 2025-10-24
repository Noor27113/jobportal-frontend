

import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from './Components/Navbar/Nav.jsx';
import Register from './Components/Navbar/Register.jsx';
import Login from './Components/Navbar/Login.jsx';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hideNav = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
       
          
        
      </Routes>
    </>
  );
}

export default App;
