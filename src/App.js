// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import your view components
import LoginView from './views/LoginView';
import InstructorDash from './views/InstructorDash';
import StudentDashboard from './views/StudentDashboard';
import Attendance from './views/Attendance';
import CourseView from './views/CourseView';
import LogoutComponent from './views/LogoutComponent';
import './App.css';

function App() {
  // Set up state for authentication and user role
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Check for existing login session on component mount
  useEffect(() => {
    // You would typically check local storage or make an API call
    // to verify if user is logged in and get their role
    const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole');
    
    if (storedLoginStatus && storedUserRole) {
      setLoggedIn(storedLoginStatus);
      setUserRole(storedUserRole);
    }
  }, []);
  
  // Mock login function (replace with your actual auth logic)
  const handleLogin = (id, role = 'instructor') => {
    setLoggedIn(true);
    setUserRole(role);
    
    // Store in localStorage for persistence
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  };
  
  // Mock logout function
  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null);
    
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  // Protected route component
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!loggedIn) {
      return <Navigate to="/" replace />;
    }
    
    if (allowedRole && userRole !== allowedRole) {
      return userRole === 'student' 
        ? <Navigate to="/student/dashboard" replace /> 
        : <Navigate to="/dashboard" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="app">
        {/* Include Navbar across all pages with appropriate props */}
        <Navbar 
          loggedIn={loggedIn}
          userRole={userRole}
          appName="Class Tracker" 
        />
        
        <div className="app-content">
          <Routes>
            {/* Public route - Login */}
            <Route 
              path="/" 
              element={
                loggedIn 
                  ? (userRole === 'student' 
                      ? <Navigate to="/student/dashboard" /> 
                      : <Navigate to="/dashboard" />)
                  : <LoginView onLogin={handleLogin} />
              } 
            />
            
            {/* Instructor routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRole="instructor">
                  <InstructorDash />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/create-course" 
              element={
                <ProtectedRoute allowedRole="instructor">
                  <CourseView />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/record-attendance/:courseId" 
              element={
                <ProtectedRoute allowedRole="instructor">
                  <Attendance />
                </ProtectedRoute>
              } 
            />
            
            {/* Student routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Logout route */}
            <Route 
              path="/logout" 
              element={<LogoutComponent onLogout={handleLogout} />} 
            />
            
            {/* Catch-all redirect to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;