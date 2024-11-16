import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Contact Management
        </Typography>
        <Button color="inherit" onClick={() => navigate('/body')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('./about')}>About</Button>
        <Button color="inherit" onClick={() => navigate('./view')}>Contacts</Button>
        <Button color="inherit" onClick={() => navigate('./add')}>Add Contact</Button>
        <Button color="inherit" onClick={() => navigate('./profile')}><AccountCircleIcon /></Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
