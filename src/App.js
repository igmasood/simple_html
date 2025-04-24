// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import your view components
import LoginView from './views/LoginView';
import InstructorDash from './views/InstructorDash';
import Attendance from './views/Attendance';
import CourseView from './views/CourseView';
import LogoutComponent from './views/LogoutComponent';
// import ReportAttendanceView from './views/ReportAttendanceView';
import './App.css';

function App() {
  // Set up state for authentication
  const [loggedIn, setLoggedIn] = useState(false);
  
  // Check for existing login session on component mount
  useEffect(() => {
    // You would typically check local storage or make an API call
    // to verify if user is logged in
    const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedLoginStatus) {
      setLoggedIn(storedLoginStatus);
    }
  }, []);
  
  // Mock login function (replace with your actual auth logic)
  const handleLogin = (id) => {
    setLoggedIn(true);
    
    // Store in localStorage for persistence
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  // Mock logout function
  const handleLogout = () => {
    setLoggedIn(false);
    
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="app">
        {/* Include Navbar across all pages with appropriate props */}
        <Navbar 
          loggedIn={loggedIn} 
          appName="Class Tracker" 
        />
        
        <div className="app-content">
          <Routes>
            {/* Public route - Login */}
            <Route 
              path="/" 
              element={
                loggedIn ? 
                <Navigate to="/dashboard" /> : 
                <LoginView onLogin={handleLogin} />
              } 
            />
            
            {/* Instructor routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <InstructorDash />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/create-course" 
              element={
                <ProtectedRoute>
                  <CourseView />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/record-attendance/:courseId" 
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } 
            />
            
            {/* Comment out this route since ReportAttendanceView is not imported */}
            {/* 
            <Route 
              path="/report-attendance/:sessionId" 
              element={<ReportAttendanceView />} 
            />
            */}
            
            {/* Updated Logout route with dedicated component */}
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