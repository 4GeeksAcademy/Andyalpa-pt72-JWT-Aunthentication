import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { store, actions } = useContext(Context); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      
        let response = await fetch(process.env.BACKEND_URL + "/profile", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${store.token}`,
            'Content-Type': 'application/json'
          },
        });
        let data = await response.json();
        console.log(data);
        
       
        if(!response.ok) {
          throw Error("No user found")
        } else {
          setUser(data);
        }
      
    };

    fetchUser();
  }, [store.token]);

  const handleLogout = () => {
    actions.logout();
    navigate("/")
  }

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
    </div>
  );
};

export default Profile;
