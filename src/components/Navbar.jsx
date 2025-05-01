// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ loggedIn, userRole, appName = "Class Tracker" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Render navigation links based on user role
  const renderNavLinks = () => {
    if (!loggedIn) {
      return (
        <li>
          <Link to="/" onClick={closeMenu}>Login</Link>
        </li>
      );
    }

    if (userRole === 'student') {
      return (
        <>
          <li>
            <Link to="/student/dashboard" onClick={closeMenu}>Dashboard</Link>
          </li>
          <li>
            <Link to="/logout" onClick={closeMenu}>Logout</Link>
          </li>
        </>
      );
    }

    // Default to instructor navigation
    return (
      <>
        <li>
          <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
        </li>
        <li>
          <Link to="/create-course" onClick={closeMenu}>Create Course</Link>
        </li>
        <li>
          <Link to="/logout" onClick={closeMenu}>Logout</Link>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link 
          to={loggedIn 
            ? (userRole === 'student' ? '/student/dashboard' : '/dashboard')
            : '/'
          } 
          className="navbar-logo"
        >
          {appName}
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        
        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          {renderNavLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;