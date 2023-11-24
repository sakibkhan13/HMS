// // In your React component where you want to fetch and display blood availability
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BloodAvailabilityComponent = () => {
//   const [bloodAvailability, setBloodAvailability] = useState([]);

//   useEffect(() => {
//     const fetchBloodAvailability = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/blood-availability/');
//         setBloodAvailability(response.data);
//       } catch (error) {
//         console.error('Error fetching blood availability:', error);
//       }
//     };

//     fetchBloodAvailability();
//   }, []);

//   return (
//     <div>
//       <h2>Blood Availability</h2>
//       <ul>
//         {bloodAvailability.map((item) => (
//           <li key={item.id}>{item.blood_group} - {item.total_bags} bags available</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BloodAvailabilityComponent;
// BloodAvailabilityComponent.js
// BloodAvailabilityComponent.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './BloodAvailability.css';

// const BloodAvailability = () => {
//   const [bloodAvailability, setBloodAvailability] = useState([]);

//   useEffect(() => {
//     const fetchBloodAvailability = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/blood-availability/');
//         setBloodAvailability(response.data);
//       } catch (error) {
//         console.error('Error fetching blood availability:', error);
//       }
//     };

//     fetchBloodAvailability();
//   }, []);

//   return (
//     <div className="blood-availability-container">
//       <div className="blood-availability-content">
//         <h2>Blood Availability</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Blood Group</th>
//               <th>Total Bags</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bloodAvailability.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.blood_group}</td>
//                 <td>
//                   <div className="bag-box">{item.total_bags} bags available</div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BloodAvailability;
// BloodAvailabilityComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BloodAvailability.css';

const BloodAvailability = () => {
  const [bloodAvailability, setBloodAvailability] = useState([]);

  useEffect(() => {
    const fetchBloodAvailability = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/blood-availability/');
        setBloodAvailability(response.data);
      } catch (error) {
        console.error('Error fetching blood availability:', error);
      }
    };

    fetchBloodAvailability();
  }, []);

  return (
    <div className="blood-availability-container">
      <div className="blood-availability-content">
        <h2>Blood Availability</h2>
        <table>
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Total Bags</th>
            </tr>
          </thead>
          <tbody>
            {bloodAvailability.map((item) => (
              <tr key={item.id}>
                <td className="blood-group-column">{item.blood_group}</td>
                <td className="total-bags-column">
                  <div className="bag-box">{item.total_bags} bags available</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodAvailability;
