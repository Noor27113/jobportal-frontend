

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import logo from '../../assets/logo.svg';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-container') && !e.target.closest('.mobile-menu')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="job-portal-header">
      <nav className="navbar-container container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none">
          <img src={logo} alt="Job Portal Logo" className="job-portal-icon" />
          <span className="job-portal-label">Job Portal</span>
        </Link>

        <button
          className="hamburger-btn d-lg-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hamburger-icon"></span>
        </button>

        <ul className="nav-links d-none d-lg-flex gap-4 mb-0">
          <li><Link to="/" className="nav-link text-white">Home</Link></li>
          <li><Link to="/jobs" className="nav-link text-white">Jobs</Link></li>
          <li><Link to="/contact" className="nav-link text-white">Contact Us</Link></li>
        </ul>

        <div className="d-none d-lg-flex gap-2">
          {token ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login"><button className="btn btn-outline-light">Login</button></Link>
              <Link to="/register"><button className="btn btn-teal">Register</button></Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu text-center py-3" id="mobile-menu">
          <ul className="nav-links flex-column gap-3 mb-4">
            <li><Link to="/" className="nav-link text-white" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/jobs" className="nav-link text-white" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
            <li><Link to="/contact" className="nav-link text-white" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          </ul>
          <div className="d-flex flex-column gap-2">
            {token ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login"><button className="btn btn-outline-light">Login</button></Link>
                <Link to="/register"><button className="btn btn-teal" onClick={() => setMenuOpen(false)}>Register</button></Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section text-center px-3 py-5">
        <h1 className="hero-title mb-3">Find Your Dream Job Today!</h1>
        <p className="hero-subtitle mx-auto">
          Connecting Talent with Opportunity: Your Gateway to Career Success.
        </p>
      </section>
    </header>
  );
};

export default Nav;
