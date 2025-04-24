// src/views/LogoutComponent.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LogoutComponent = ({ onLogout }) => {
  useEffect(() => {
    // Execute logout function when component mounts
    onLogout();
  }, [onLogout]);

  // Immediately redirect to the login page
  return <Navigate to="/" replace />;
};

export default LogoutComponent;