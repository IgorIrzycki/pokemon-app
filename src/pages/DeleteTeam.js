import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeleteTeam.css'


const DeleteTeam = () => {
  const [userTeams, setUser] = useState([]);

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

  useEffect(() => {
    

    fetchUser();
  }, []);

  const handleDeleteTeam = async (teamName) => {
    try {
        const storedData = localStorage.getItem('user');
        const userData = JSON.parse(storedData);
        await axios.delete(`/api/v1/teams/${teamName}/${userData}`);
        
        fetchUser();
    } catch (error) {
        console.error('Error deleting team:', error);
    }
};


  return (
    <div>
      <h2>Delete Team</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Pokemons</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userTeams.teamIds && userTeams.teamIds.map((team) => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.pokemonNames.join(', ')}</td>
              <td>
                <button onClick={() => handleDeleteTeam(team.teamName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteTeam;
