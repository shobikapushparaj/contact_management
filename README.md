## Project Description

This is a **Contact Management System** built using the **MERN stack** (MongoDB, Express, React, Node.js). The system allows users to add, view, update, and delete contacts. Each contact has details like first name, last name, email, phone number, company, and job title. The system also features a search functionality for finding contacts by name.

### Features
- **Add Contact**: Create new contacts with details such as first name, last name, email, phone, company, and job title.
- **View Contacts**: View a list of all contacts, with sorting by first name.
- **Edit Contact**: Edit contact details, with validations to ensure email and phone numbers are unique.
- **Delete Contact**: Delete contacts from the system.
- **Search Functionality**: Search contacts by first or last name.

---

## Setup Instructions
To run the frontend server:
    
bash
    cd client
    npm run dev

To run the backend server:
    
bash
    cd backend
    node server.js

    The backend server will run on http://localhost:4000.
Set up MongoDB:
   - If you're using **MongoDB Atlas**, create a cluster and obtain the connection string.
   - If you're using **local MongoDB**, ensure MongoDB is running on your machine.

### Contact Model

javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
