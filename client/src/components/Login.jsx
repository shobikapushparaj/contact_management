import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import login from '../images/login.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!name || !password) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/login', { name, password });
      const userData = response.data;

      if (userData && userData.id) {
        // Store userId in sessionStorage
        sessionStorage.setItem('userId', userData.id);
        navigate('/body');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);

      // Handling specific error messages
      if (error.response && error.response.data && error.response.data.message) {
        const message = error.response.data.message;
        if (message === 'Username does not exist') {
          window.alert('Username does not exist. Please check the username or sign up.');
        } else if (message === 'Password is incorrect') {
          window.alert('Password is incorrect. Please try again.');
        } else {
          setError('Error occurred during login. Please try again later.');
        }
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={login} alt="Login Image" style={{ width: '80%' }} />
        </Box>
        <Box sx={{ flex: 1, padding: 3 }}>
          <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}>
            WELCOME BACK
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ height: '50px', fontSize: '20px', fontWeight: 'bold' }}>
              Login
            </Button>
            {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
