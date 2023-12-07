// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import CreateTeam from './pages/CreateTeam';
import CommentsReviews from './pages/CommentsReviews';
import AuthPage from './pages/AuthPage';
import MyTeams from './pages/MyTeams';
import UpdateTeam from './pages/UpdateTeam'; 
import DeleteTeam from './pages/DeleteTeam'; 

import './styles/App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Pokemon App</h1>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </header>
        <main className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <AuthPage onLogin={handleLogin} />
                )
              }
            />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
            <Route path="/pokedex" element={isLoggedIn ? <Pokedex /> : <Navigate to="/" />} />
            <Route path="/create-team" element={isLoggedIn ? <CreateTeam /> : <Navigate to="/" />} />
            <Route
              path="/comments-reviews"
              element={isLoggedIn ? <CommentsReviews /> : <Navigate to="/" />}
            />
            <Route
              path="/my-teams"
              element={isLoggedIn ? <MyTeams /> : <Navigate to="/" />}
            />
            <Route
              path="/auth"
              element={<AuthPage onLogin={handleLogin} />}
            />
            <Route
              path="/update-team"
              element={isLoggedIn ? <UpdateTeam /> : <Navigate to="/" />}
            />
            <Route
              path="/delete-team"
              element={isLoggedIn ? <DeleteTeam /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2023 PokemonApp by Igor Irzycki. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
