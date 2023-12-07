// MyTeams.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from '../components/Team';

const MyTeams = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedData = localStorage.getItem('user');
      const userData = JSON.parse(storedData);
      try {
        const response = await axios.get(`/api/v1/users/${userData}`);
        setUser(response.data);
        console.log('Updated User:', response.data); 
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <div>
      <h1>My Teams</h1>
      {user.teamIds && <Team user={user} />}
    </div>
  );
};

export default MyTeams;
