// src/views/LoginView.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginView = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // Student login state
  const [studentId, setStudentId] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  
  // Instructor login state
  const [instructorId, setInstructorId] = useState('');
  const [instructorPassword, setInstructorPassword] = useState('');
  
  // Error states
  const [studentError, setStudentError] = useState('');
  const [instructorError, setInstructorError] = useState('');
  
  const handleStudentLogin = (e) => {
    e.preventDefault();
    
    // Allow login even with empty values
    setStudentError('Student login not implemented in this version');
    
    // If we wanted to actually log in the student:
    // onLogin(studentId || 'defaultStudentId');
    // navigate('/student/dashboard');
  };
  
  const handleInstructorLogin = (e) => {
    e.preventDefault();
    
    // Allow login with any non-empty values
    if(instructorId.trim() && instructorPassword.trim()) {
      setInstructorError("");
      onLogin(instructorId || 'defaultInstructorId');
      navigate('/dashboard');
    } else { 
      setInstructorError("Invalid Username or Password. Please try again");
    }

  };
  
  // Handle key press events for instructor login
  const handleInstructorKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInstructorLogin(e);
    }
  };
  
  // Handle key press events for student login
  const handleStudentKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleStudentLogin(e);
    }
  };
  
  return (
    <div className="login-page">
      <h1>Class Tracker</h1>
      <div className="login-container">
        <div className="login-box">
          <h3>Student Login</h3>
          <form onSubmit={handleStudentLogin}>
            <input 
              type="text" 
              id="studentID" 
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              onKeyPress={handleStudentKeyPress}
            />
            <input 
              type="password" 
              id="studentPassword" 
              placeholder="Password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              onKeyPress={handleStudentKeyPress}
            />
            {studentError && <div className="error-message">{studentError}</div>}
            <button type="submit" id="studentLoginBtn">Login as Student</button>
          </form>
        </div>
        
        <div className="login-box">
          <h3>Instructor Login</h3>
          <form onSubmit={handleInstructorLogin}>
            <input 
              type="text" 
              id="instructorID" 
              placeholder="Instructor ID"
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              onKeyPress={handleInstructorKeyPress}
            />
            <input 
              type="password" 
              id="instructorPassword" 
              placeholder="Password"
              value={instructorPassword}
              onChange={(e) => setInstructorPassword(e.target.value)}
              onKeyPress={handleInstructorKeyPress}
            />
            {instructorError && <div className="error-message">{instructorError}</div>}
            <button type="submit" id="instructorLoginBtn">Login as Instructor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;