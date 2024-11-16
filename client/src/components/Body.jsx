import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import AddContact from './AddContact';
import ViewContact from './ViewContacts';
import UserProfile from './UserProfile';
import { Container, Grid } from '@mui/material';

const Body = () => {
  return (
    <div>
      <Navbar />
      <Container className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/view" element={<ViewContact />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Container>
    </div>
  );
};

export default Body;
