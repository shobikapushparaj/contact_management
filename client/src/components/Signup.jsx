import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import signup from '../images/SignUp.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!name || !email || !password) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const result = await axios.post('http://localhost:4000/register', { name, email, password });
      console.log(result);

      // Check the response message for specific alerts
      if (result.data.message === "Email already exists") {
        window.alert("Email already exists. Please use another email.");
      } else if (result.data.message === "Username already exists") {
        window.alert("Username already exists. Please use another username.");
      } else if (result.data.message === "User created successfully") {
        sessionStorage.setItem('userId', result.data.userId);
        navigate('/body', { state: { userId: result.data.userId } });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box sx={{ flex: 1, padding: 3 }}>
          <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}>
            WELCOME 
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Username"
              type="text"
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
              SignUp
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
              Already an User? <a href="/login">Login</a>
            </Typography>
          </form>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={signup} alt="Signup Image" style={{ width: '80%' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
