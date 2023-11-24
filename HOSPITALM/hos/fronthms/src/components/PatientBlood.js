// PatientBlood.js

import React, { useState, useEffect } from 'react';
import './PatientBlood.css';

const PatientBlood = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patient blood details from your Django API
    fetch('http://127.0.0.1:8000/api/patient-blood-details/')
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="patient-blood-container">
      <h1>Patient Blood Details</h1>

      <div className="table-container">
        <table className="blood-details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.email}>
                <td>{`${patient.first_name} ${patient.last_name}`}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{patient.bloodGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientBlood;
