
import React from 'react';
import '../styles/Team.css';

const Team = ({ user }) => {
  return (
    <div className="TeamWrapper">
      {user.teamIds.map((team) => (
        <div key={team.id} className="TeamContainer2">
          <h2>{team.teamName}</h2>
          <ul>
            {team.pokemonNames.map((pokemonName, index) => (
              <li key={index}>
                <img src={team.pokemonSprites[index]} alt={pokemonName} />
                <p>{pokemonName}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Team;
