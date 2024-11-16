import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const AddContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message
  
    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setError('Phone number must be 10 digits.');
      return;
    }
  
    // Validate email
    if (!email.includes('@')) {
      setError('Email must contain "@" symbol.');
      return;
    }
  
    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    };
  
    try {
      const response = await axios.post('http://localhost:4000/Addcontact', contactData);
      if (response && response.data) {
        console.log('Contact added:', response.data);
        // Clear the form after adding a contact
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setJobTitle('');
        alert('Contact added successfully!');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
  
      if (error.response) {
        console.error('Response data:', error.response.data); // Log the response data
        if (error.response.data.message) {
          const message = error.response.data.message;
          if (message === 'Email already exists') {
            alert('Email already exists. Please use a different email.');
          } else if (message === 'Phone number already exists') {
            alert('Phone number already exists. Please use a different phone number.');
          } else {
            setError('Error occurred while adding contact. Please try again later.');
          }
        }
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };
  
  

  const handleViewContacts = () => {
    navigate('/body/view');
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company"
              fullWidth
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Contact
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleViewContacts}
            >
              View All Contacts
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddContact;
