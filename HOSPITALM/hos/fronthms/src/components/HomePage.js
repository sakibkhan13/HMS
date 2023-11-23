
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import doctorImage from '../assets/doctor.png';
import patientImage from '../assets/patient.png';

import './HomePage.css';

const HomePage = () => {
  // const currentDate = new Date().toLocaleString();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: { duration: 1000 }
  });

  return (
    <div className="home-page">
      <Navbar  includeHomeLink includeBloodBankLink includeSupportLink includeAboutLink/>
      {/* <nav className="navbar">
        <Link to="/" className="navbar-brand">Hospital Management Portal</Link>
        <div className="nav-items">
          <Link to="/blood-bank">Blood Bank</Link>
          <Link to="/about">About Us</Link>
          <Link to="/support">Support</Link>
          <span className="current-time">{currentDate}</span>
        </div>
      </nav> */}

      <div className="main-container">
        <div className="login-section">
          <div className="login-box doctor-login">
            <animated.img style={fadeIn} src={doctorImage} alt="Doctor" />
            <div className="login-info">
              <h2>Doctor Portal</h2>
              <p>Manage appointments, view patient history, and streamline operations.</p>
              <Link to="/doctor-login" className="btn btn-primary">Doctor Login</Link>
            </div>
          </div>

          <div className="login-box patient-login">
            <animated.img style={fadeIn} src={patientImage} alt="Patient" />
            <div className="login-info">
              <h2>Patient Portal</h2>
              <p>Access your medical records, schedule consultations, and more.</p>
              <Link to="/patient-login" className="btn btn-primary">Patient Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
