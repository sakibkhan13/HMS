// import React from 'react';
// import { Link } from 'react-router-dom';

// const currentDate = new Date().toLocaleString();

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <Link to="/" className="navbar-brand">Hospital Management Portal</Link>
//       <div className="nav-items">
//       <Link to="/">Home</Link>
//         <Link to="/blood-bank">Blood Bank</Link>
//         <Link to="/about">About Us</Link>
//         <Link to="/support">Support</Link>
//         <span className="current-time">{currentDate}</span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// Navbar.js
// Navbar.js
// Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const currentDate = new Date().toLocaleString();

// const Navbar = ({ includeHomeLink, includeBloodBankLink, includeAboutLink, includeSupportLink, includeLogoutLink, handleLogout }) => {
//   return (
//     <nav className="navbar">
//       <Link to="/" className="navbar-brand">Hospital Management Portal</Link>
//       <div className="nav-items">
//         {includeHomeLink && <Link to="/">Home</Link>}
//         {includeBloodBankLink && <Link to="/blood-bank">Blood Bank</Link>}
//         {includeAboutLink && <Link to="/about">About Us</Link>}
//         {includeSupportLink && <Link to="/support">Support</Link>}
//         {includeLogoutLink && <Link to="/" onClick={handleLogout}>Logout</Link>}
//         <span className="current-time">{currentDate}</span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
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
