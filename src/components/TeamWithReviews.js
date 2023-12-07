
import React from 'react';
import '../styles/TeamWithReviews.css';

const TeamWithReviews = ({ team }) => {
  return (
    <div className="TeamWithReviewsContainer">
      <div className="TeamContainer">
        <h3>{team.teamName}</h3>
        <div className="PokemonContainer">
          {team.pokemonSprites.map((imageUrl, index) => (
            <div key={index} className="PokemonItem">
              <img src={imageUrl} alt={`Pokemon ${index + 1}`} />
              <p>{team.pokemonNames[index]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="ReviewsContainer">
        <h4>Reviews:</h4>
        <ul>
          {team.reviewIds.map((review) => (
            <li key={review.id} className="ReviewItem">
              {review.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamWithReviews;
