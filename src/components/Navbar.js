import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(null);
  const [username, setUsername] = useState('');
  const [isNavbarFixed, setNavbarFixed] = useState(false);

  const printLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`${key}: ${value}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      const scrollThreshold = 130;

      if (scrollDistance > scrollThreshold) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    printLocalStorage();

    const storedData = localStorage.getItem('user');
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        console.log('User from local storage:', userData);
        setUsername(userData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/');
  };

  return (
    <nav style={{position: isNavbarFixed ? 'fixed' : 'relative' }}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/pokedex">Pokedex</Link>
            </li>
            <li
              onMouseEnter={() => setSelectedSection('team')}
              onMouseLeave={() => setSelectedSection(null)}
            >
              <span
                onMouseEnter={() => setSelectedSection('team')}
                onMouseLeave={() => setSelectedSection(null)}
              >
                Team
                <div className={`submenu ${selectedSection === 'team' ? 'visible' : ''}`}>
                  <Link to="/create-team">Create Team</Link>
                  <Link to="/my-teams">My Teams</Link>
                </div>
              </span>
            </li>
            <li
              onMouseEnter={() => setSelectedSection('edit-team')}
              onMouseLeave={() => setSelectedSection(null)}
            >
              <span
                onMouseEnter={() => setSelectedSection('edit-team')}
                onMouseLeave={() => setSelectedSection(null)}
              >
                Edit Team
                <div className={`submenu ${selectedSection === 'edit-team' ? 'visible' : ''}`}>
                  <Link to="/update-team">Update Team</Link>
                  <Link to="/delete-team">Delete Team</Link>
                </div>
              </span>
            </li>
            <li>
              <Link to="/comments-reviews">Reviews</Link>
            </li>
          </>
        )}
        <li
          onMouseEnter={() => setSelectedSection('login')}
          onMouseLeave={() => setSelectedSection(null)}
        >
          {isLoggedIn ? (
            <>
              <span>Hello, {username}!</span>
              <div className={`submenu ${selectedSection === 'login' ? 'visible' : ''}`}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
