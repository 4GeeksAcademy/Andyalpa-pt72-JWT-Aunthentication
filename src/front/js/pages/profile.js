// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = sessionStorage.getItem('token');
//       if (token) {
//         const response = await fetch('/profile', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUser(data);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {user.name}</h1>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// };

// export default Profile;
