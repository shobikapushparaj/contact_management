import React from 'react';
import { Typography, Paper } from '@mui/material';

const About = () => {
  return (
    <Paper 
      style={{
        padding: '40px',
        textAlign: 'center',
        marginTop: '101px',
        color: 'black',              // White text for contrast
        borderRadius: '8px',         // Rounded corners
        boxShadow: ' 0.5px 2px 3px 3px #1976d2', // Soft shadow for depth
        maxWidth: '800px',           // Max width for better control
        margin: '0 auto'             // Center the paper
      }}
    >
      <Typography color='#1976d2' fontWeight='bold' fontSize='2 rem' paddingBlockStart='0px'variant="h4" gutterBottom>
        About This App
      </Typography>
      <Typography variant="body1" color="inherit" paddingTop={'20px'}>
        This application allows you to manage your contacts efficiently. 
        You can view, add, edit, and delete contacts with ease. The app is built with React and Material-UI for a smooth user experience.
        For the backend using Node.js and Express.js
      </Typography>
    </Paper>
  );
}

export default About;
