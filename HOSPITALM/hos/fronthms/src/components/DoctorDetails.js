
import React, { useState, useEffect } from 'react';
import './DoctorDetails.css';
import Navbar from './Navbar';
function DoctorDetails() {
    const [departmentWiseDoctors, setDepartmentWiseDoctors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/doctors/')
            .then(response => response.json())
            .then(data => {
                const groupedData = data.reduce((acc, doctor) => {
                    const department = doctor.department || 'Other';
                    acc[department] = acc[department] || [];
                    acc[department].push(doctor);
                    return acc;
                }, {});
                setDepartmentWiseDoctors(groupedData);
            })
            .catch(error => {
                console.error("Error fetching doctors:", error);
            });
    }, []);

    const filterDoctors = (doctors) => {
        return doctors.filter((doctor) =>
            doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="doctor-details-page">
            <Navbar/>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="doctor-availability-page">
                {Object.entries(departmentWiseDoctors).map(([department, doctors]) => (
                    <section key={department} className="department-section">
                        <h2 className="department-title">{department}</h2>
                        <div className="doctors-list">
                            {filterDoctors(doctors).map((doctor, index) => (
                                <div key={index} className="doctor-card">
                                    <div className="doctor-name">{doctor.first_name} {doctor.last_name}</div>
                                    <div className="doctor-info">
                                        <p>Email: {doctor.email}</p>
                                        <p>Phone: {doctor.phone}</p>
                                        <p>Degree: {doctor.degree}</p>
                                        <p>Medical College: {doctor.medical_college}</p>
                                        <p>Speciality: {doctor.speciality}</p>
                                        <p>Availability: {doctor.availability}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default DoctorDetails;
