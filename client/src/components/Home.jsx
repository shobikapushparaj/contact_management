import React from 'react';
import { Grid, Typography } from '@mui/material';
import contactImage from '../images/contact_img.jpg';

const Home = () => {
  return (
    <Grid container spacing={0} sx={{ height: '100vh' }}>
      {/* Left Side: Text Content */}
      <Grid item xs={12} sm={6} container  justifyContent="center" sx={{ padding: '20px' }}>
        <div>
          <Typography variant="h3" fontWeight="bold" paddingTop='180px' color="primary" gutterBottom>
            Manage Your Contacts Effortlessly!
          </Typography>
          <Typography variant="body1" fontWeight="medium" color="textSecondary" sx={{ fontSize: '1.5rem' }}>
            Your ultimate solution for contact management.
          </Typography>
        </div>
      </Grid>

      {/* Right Side: Image */}
      <Grid item xs={12} sm={6} container sx={{ padding: 0 }}>
        <img
          src={contactImage}
          alt="Contact Management"
          style={{
            width: '150%',
            height: '90%',  // Ensures the image covers the full container
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
