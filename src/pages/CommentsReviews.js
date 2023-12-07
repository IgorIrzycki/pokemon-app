
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CommentsReviews.css';
import TeamWithReviews from '../components/TeamWithReviews';

const CommentsReviews = () => {
  const [teams, setTeams] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('/api/v1/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setShowReviewForm(true); 
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleAddReview = async () => {
    try {
      if (selectedTeam && newReview) {
        await axios.post('/api/v1/reviews', {
          reviewBody: newReview,
          teamName: selectedTeam.teamName,
        });

        const updatedTeams = await axios.get('/api/v1/teams');
        setTeams(updatedTeams.data);

        
        setNewReview('');
        
        setSelectedTeam(null);
        
        setShowReviewForm(false);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleCancelReview = () => {
    
    setNewReview('');
    
    setSelectedTeam(null);
    
    setShowReviewForm(false);
  };

  return (
    <div className="CommentsReviewsContainer">
      <h1>Reviews</h1>
      {teams.map((team) => (
        <div key={team.id} className="TeamContainer" onClick={() => handleSelectTeam(team)}>
          <TeamWithReviews key={team.id} team={team} />
        </div>
      ))}
      {selectedTeam && showReviewForm && (
        <div className="Overlay">
          <div className="ReviewForm">
            <h3>Add a Review for {selectedTeam.teamName}</h3>
            <textarea
              placeholder="Write your review here..."
              value={newReview}
              onChange={handleReviewChange}
            />
            <div className="ButtonContainer">
              <button onClick={handleAddReview}>Submit Review</button>
              <button onClick={handleCancelReview}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsReviews;
