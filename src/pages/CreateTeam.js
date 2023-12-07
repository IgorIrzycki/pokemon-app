
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateTeam.css';  

const CreateTeam = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = response.data.results;
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleRemovePokemon = (pokemon) => {
    setSelectedPokemon((prevSelected) =>
      prevSelected.filter((selected) => selected !== pokemon)
    );
  };

  const handleSaveTeam = async () => {
    try {
      const spritesPromises = selectedPokemon.map(async (pokemon) => {
        const spriteResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return spriteResponse.data.sprites.front_default;
      });
  
      const pokemonSprites = await Promise.all(spritesPromises);
  
      const storedData = localStorage.getItem('user');
      const userData = JSON.parse(storedData);

      await axios.post('/api/v1/teams', {
        teamName,
        pokemonNames: selectedPokemon.map(pokemon => pokemon.name),
        pokemonSprites,
        reviewIds: [], 
        userName: userData
      });
  
      alert('Team saved successfully!');
    } catch (error) {
      console.error('Error saving team:', error);
      alert('Error saving team. Please try again.');
    }
  };
  
  

  const handlePokemonSelect = (pokemon) => {
    if (selectedPokemon.length < 6 && !selectedPokemon.some(selected => selected.name === pokemon.name)) {
      setSelectedPokemon((prevSelected) => [...prevSelected, pokemon]);
    } else if (selectedPokemon.length >= 6) {
      alert('Your team can have at most 6 Pokémon.');
    }
  };  

  return (
    <div>
      <h1>Create Team</h1>
      <input
        type="text"
        placeholder="Enter team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.name}
            className={`pokemon-item ${selectedPokemon.includes(pokemon) ? 'pokemon-selected' : ''}`}
            onClick={() => handlePokemonSelect(pokemon)}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
      <ul>
        {selectedPokemon.map((pokemon) => (
          <li
            key={pokemon.name}
          >
            {pokemon.name}{' '}
            <button onClick={() => handleRemovePokemon(pokemon)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className='save-button'
        onClick={handleSaveTeam}
        disabled={teamName === '' || selectedPokemon.length === 0}
      >
        Save Team
      </button>
    </div>
  );
};

export default CreateTeam;
