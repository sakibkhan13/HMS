// // Import necessary libraries
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar'; // Import the Navbar component
// import './Test.css'; // Import the associated CSS file

// // Functional component definition
// const Test = () => {
//   // State variables for managing data
//   const [testCharge, setTestCharge] = useState([]);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [totalBill, setTotalBill] = useState(0);
//   const [doctorName, setDoctorName] = useState('');
//   const [doctorEmail, setDoctorEmail] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [patientEmail, setPatientEmail] = useState('');

//   // Fetch test charge data from the Django API on component mount
//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/get-test-charge/')
//       .then(response => setTestCharge(response.data))
//       .catch(error => console.error('Error fetching test charge:', error));
//   }, []);

//   // Function to handle test selection
//   const handleTestSelection = (test) => {
//     const updatedTests = selectedTests.includes(test)
//       ? selectedTests.filter(selectedTest => selectedTest !== test)
//       : [...selectedTests, test];

//     setSelectedTests(updatedTests);

//     const updatedTotalBill = updatedTests.reduce((acc, selectedTest) => {
//       const matchingTest = testCharge.find(tc => tc.service_name === selectedTest);
//       return acc + (matchingTest ? parseFloat(matchingTest.price) : 0);
//     }, 0);

//     setTotalBill(updatedTotalBill);
//   };

//   // Function to handle sending test details to the server
//   const handleSendTest = () => {
//     axios.post('http://127.0.0.1:8000/api/test-bill/', {
//       doctor_name: doctorName,
//       doctor_email: doctorEmail,
//       patient_name: patientName,
//       patient_email: patientEmail,
//       test_name: selectedTests,
//       total_bill: totalBill,
//     })
//       .then(response => {
//         console.log('Test sent successfully:', response.data);
//         // You can handle success message here
//       })
//       .catch(error => {
//         console.error('Error sending test:', error);
//         // You can handle error message here
//       });
//   };

//   // JSX structure for the component
//   return (
//     <div>
//       <Navbar /> {/* Include the Navbar component at the top of the page */}
//       <div className="test-container">
//         {/* Test Charge Table */}
//         <div className="test-box test-service-table">
//           <h2 className="table-title">Test Charge</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Service Name</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {testCharge.map(test => (
//                 <tr key={test.service_name}>
//                   <td>{test.service_name}</td>
//                   <td>BDT {test.price}</td>
//                   <td>
//                     <button
//                       onClick={() => handleTestSelection(test.service_name)}
//                       className={selectedTests.includes(test.service_name) ? 'selected' : ''}
//                     >
//                       {selectedTests.includes(test.service_name) ? 'Selected' : 'Select'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Add Test to Patient Form */}
//         <div className="test-box test-add-to-patient">
//           <h2 className="form-title">Add Test to Patient</h2>
//           <div className="form">
//             <label>Doctor Name:</label>
//             <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
//             <label>Doctor Email:</label>
//             <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} />
//             <label>Patient Name:</label>
//             <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
//             <label>Patient Email:</label>
//             <input type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
//             <label>Selected Tests:</label>
//             <div>
//               {selectedTests.map(test => (
//                 <span key={test} className="selected-test">{test}</span>
//               ))}
//             </div>
//             <label>Total Bill:</label>
//             <span>BDT {totalBill.toFixed(2)}</span>
//             <button onClick={handleSendTest}>Send Test</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Export the component
// export default Test;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Test.css';

const Test = () => {
  const [testCharge, setTestCharge] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch test charge data from the Django API
    axios.get('http://127.0.0.1:8000/api/get-test-charge/')
      .then(response => setTestCharge(response.data))
      .catch(error => console.error('Error fetching test charge:', error));
  }, []);

  const handleTestSelection = (test) => {
    const updatedTests = selectedTests.includes(test)
      ? selectedTests.filter(selectedTest => selectedTest !== test)
      : [...selectedTests, test];

    setSelectedTests(updatedTests);
    const updatedTotalBill = updatedTests.reduce((acc, selectedTest) => {
      const matchingTest = testCharge.find(tc => tc.service_name === selectedTest);
      return acc + (matchingTest ? parseFloat(matchingTest.price) : 0);
    }, 0);
    setTotalBill(updatedTotalBill);
  };

  const handleSendTest = () => {
    // Send test details to the server and store in test_bill table
    axios.post('http://127.0.0.1:8000/api/test-bill/', {
      doctor_name: doctorName,
      doctor_email: doctorEmail,
      patient_name: patientName,
      patient_email: patientEmail,
      test_name: selectedTests,
      total_bill: totalBill,
    })
      .then(response => {
        console.log('Test sent successfully:', response.data);
        setSuccessMessage('Test sent successfully!');
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error sending test:', error);
        setSuccessMessage('');
        setErrorMessage('Error sending test. Please try again.');
      });
  };

  return (
    <div className="test-body">
      <div className="test-container">
        <div className="test-box">
          <h2 className="table-title">Test Charge</h2>
          <table className="test-service-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testCharge.map(test => (
                <tr key={test.service_name}>
                  <td>{test.service_name}</td>
                  <td>BDT {test.price}</td>
                  <td>
                    <button
                      onClick={() => handleTestSelection(test.service_name)}
                      className={selectedTests.includes(test.service_name) ? 'selected' : ''}
                    >
                      {selectedTests.includes(test.service_name) ? 'Selected' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="test-box">
          <h2 className="form-title">Add Test to Patient</h2>
          <div className="form test-add-to-patient">
            <label>Doctor Name:</label>
            <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
            <label>Doctor Email:</label>
            <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} />
            <label>Patient Name:</label>
            <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            <label>Patient Email:</label>
            <input type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
            <label>Selected Tests:</label>
            <div>
              {selectedTests.map(test => (
                <span key={test} className="selected-test">{test}</span>
              ))}
            </div>
            <label>Total Bill:</label>
            <span>BDT {totalBill.toFixed(2)}</span>
            <button onClick={handleSendTest}>Send Test</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
