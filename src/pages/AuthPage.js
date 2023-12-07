import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css'

const AuthPage = ({onLogin}) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/v1/users/login', {
        userName: loginUsername,
        password: loginPassword,
      });
  
      console.log('Login response:', response);
      
      localStorage.setItem('user', JSON.stringify(response.data));
      
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/v1/users', {
        userName: registerUsername,
        password: registerPassword,
        email: registerEmail,
        teamIds: []
      });

      console.log('Registration successful:', response.data);

      setRegisterUsername('');
      setRegisterPassword('');
      setRegisterEmail('');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="register-container">
        <h2>Register</h2>
        <label>
          Username:
          <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
        </label>
        <br />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default AuthPage;
