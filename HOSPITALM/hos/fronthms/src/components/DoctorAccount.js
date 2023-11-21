
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import './DoctorAccount.css';
// // import  Navbar from './Navbar';

// // function DoctorAccount() {
// //     const [doctor, setDoctor] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const email = localStorage.getItem("doctor_email");

// //         if (!email) {
// //             navigate("/doctor-login");
// //         } else {
// //             fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
// //                 .then(response => response.json())
// //                 .then(data => {
// //                     setDoctor(data);
// //                 })
// //                 .catch(error => {
// //                     console.error("Error fetching doctor details:", error);
// //                 });
// //         }
// //     }, [navigate]);

// //     const handleLogout = () => {
// //         localStorage.removeItem("doctor_email");
// //         navigate("/doctor-login");
// //     };

// //     if (!doctor) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="doctor-account-background">
// //              <Navbar 
                
// //                 includeLogoutLink={true}
// //                 handleLogout={handleLogout}
// //             />
// //             <div className="dashboard-container">
// //                 <h1>Welcome, Dr. {doctor.first_name} {doctor.last_name}</h1>
// //                 <div className="profile-section">
// //                     <Link to="/doctor-profile-update" className="profile-link">Update Your Profile</Link>
// //                 </div>

// //                 <p>You have the following options:</p>

// //                 <div className="dashboard-options">
// //                     <div className="dashboard-box">
// //                         <h2>View Patients</h2>
// //                         <p>View and manage your patient records</p>
// //                         <Link to="/patient-details" className="box-link">View Patients</Link>
// //                     </div>
// //                     <div className="dashboard-box">
// //                         <h2>View Appointments</h2>
// //                         <p>View and manage your appointments</p>
// //                         <Link to="/view-appointments" className="box-link">View Appointments</Link>
// //                     </div>
// //                     <div className="dashboard-box">
// //                         <h2>Add Prescription</h2>
// //                         <p>Add a new prescription for a patient</p>
// //                         <Link to="/add-prescription" className="box-link">Add Prescription</Link>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default DoctorAccount;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './DoctorAccount.css';
// import Navbar from './Navbar';

// function DoctorAccount() {
//     const [doctor, setDoctor] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const email = localStorage.getItem("doctor_email");
//         if (!email) {
//             navigate("/doctor-login");
//         } else {
//             fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
//                 .then(response => response.json())
//                 .then(data => setDoctor(data))
//                 .catch(error => console.error("Error fetching doctor details:", error));
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("doctor_email");
//         navigate("/doctor-login");
//     };

//     const getTimeOfDayGreeting = () => {
//         const hour = new Date().getHours();
//         return hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
//     };

//     if (!doctor) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="doctor-account-background">
//             <Navbar includeLogoutLink={true} handleLogout={handleLogout} />
//             <div className="dashboard-container">
//                 <h1>{getTimeOfDayGreeting()}, Dr. {doctor.first_name} {doctor.last_name}</h1>
//                 <div className="patient-search-bar">
//                     <input type="text" placeholder="Search Patients..." />
//                 </div>
//                 <div className="dashboard-options">
//                     <div className="dashboard-box">
//                         <h2>View Patients</h2>
//                         <p>View and manage your patient records</p>
//                         <Link to="/patient-details" className="box-link">View Patients</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>View Appointments</h2>
//                         <p>View and manage your appointments</p>
//                         <Link to="/view-appointments" className="box-link">View Appointments</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>Add Prescription</h2>
//                         <p>Add a new prescription for a patient</p>
//                         <Link to="/add-prescription" className="box-link">Add Prescription</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DoctorAccount;
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DoctorAccount.css';
import Navbar from './Navbar';

function DoctorAccount() {
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("doctor_email");
        if (!email) {
            navigate("/doctor-login");
        } else {
            fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
                .then(response => response.json())
                .then(data => setDoctor(data))
                .catch(error => console.error("Error fetching doctor details:", error));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("doctor_email");
        navigate("/");
    };

    const getTimeOfDayGreeting = () => {
        const hour = new Date().getHours();
        return hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="doctor-account-background">
            <Navbar includeLogoutLink={true} handleLogout={handleLogout} />
            <div className="dashboard-container">
                <div className="welcome-profile-box">
                    <h1>{getTimeOfDayGreeting()}, Dr. {doctor.first_name} {doctor.last_name}</h1>
                    <Link to="/doctor-profile-update" className="profile-link">Update Your Profile</Link>
                </div>
                <div className="dashboard-options">
                    <div className="dashboard-box">
                        <h2>View Patients</h2>
                        <p>View and manage your patient records</p>
                        <Link to="/patient-details" className="box-link">View Patients</Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>View Appointments</h2>
                        <p>View and manage your appointments</p>
                        <Link to="/view-appointments" className="box-link">View Appointments</Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>Add Prescription</h2>
                        <p>Add a new prescription for a patient</p>
                        <Link to="/add-prescription" className="box-link">Add Prescription</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorAccount;

