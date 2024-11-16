import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Signup from './components/Signup';
import AddContact from './components/AddContact';
import ViewContact from './components/ViewContacts';
import Body from './components/Body';
import About from './components/About';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Default landing page */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Main page with navigation */}
          <Route path="/body" element={<Body />}>
            {/* Nested routes inside the Body component */}
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="add" element={<AddContact />} />
            <Route path="view" element={<ViewContact />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
