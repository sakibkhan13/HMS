
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({
  includeHomeLink = false,
  includeBloodBankLink = false,
  includeAboutLink = false,
  includeSupportLink = false,
  includeLogoutLink = false,
  includeImportantMessagesLink = false,
  handleLogout
}) => {
  const currentDate = new Date().toLocaleString();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Hospital Management Portal</Link>
      <div className="nav-items">
        {includeHomeLink && <Link to="/">Home</Link>}
        {includeBloodBankLink && <Link to="/blood-bank">Blood Bank</Link>}
        {includeAboutLink && <Link to="/about">About Us</Link>}
        {includeSupportLink && <Link to="/supports">Supports</Link>}
        {includeImportantMessagesLink && <Link to="/important-messages">Important Messages</Link>}
        {includeLogoutLink && <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>}
        <span className="current-time">{currentDate}</span>
      </div>
    </nav>
  );
};

export default Navbar;
