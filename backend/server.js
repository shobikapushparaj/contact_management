const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { UserModel, contactmodel } = require('./models/schema');

const app = express();
app.use(express.json());
app.use(cors());

async function connectdb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/contactsDB");
    console.log("db connection success");

    const port = 4000;
    app.listen(port, function () {
      console.log(`Server started on port ${port}...`);
    });
  } catch (err) {
    console.log("DB not connected: " + err);
  }
}

connectdb();

/// LOGIN
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log(`Login attempt: name=${name}, password=${password}`);
  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'Username does not exist' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    // Successful login
    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/// SIGNUP
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if the username already exists
    const existingUsername = await UserModel.findOne({ name });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // If both checks pass, create the new user
    const user = new UserModel({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//addcont
app.post('/Addcontact', async (req, res) => {
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;

  try {
    // Check if the email already exists
    const emailExists = await contactmodel.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Check if the phone number already exists
    const phoneExists = await contactmodel.findOne({ phone });
    if (phoneExists) {
      return res.status(409).json({ message: 'Phone number already exists' });
    }

    // Create a new contact if email and phone do not exist
    const newContact = new contactmodel({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    });

    await newContact.save();
    res.status(201).json({message: "Task added successfully"});
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact', error: error.message });
  }
});

// GET /contacts: Retrieve all contacts
app.get('/getcontact', async (req, res) => {
  try {
    const contacts = await contactmodel.find();
    res.json(contacts); // Return all contacts with 200 status
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/// GET CONTACTS
app.get('/getcontact', async (req, res) => {
  try {
    const contacts = await contactmodel.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/updatecontact/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const { email, phone } = req.body;

    // Check if the email already exists for a different contact
    const existingEmail = await contactmodel.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== contactId) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Check if the phone number already exists for a different contact
    const existingPhone = await contactmodel.findOne({ phone });
    if (existingPhone && existingPhone._id.toString() !== contactId) {
      return res.status(409).json({ message: 'Phone number already exists' });
    }

    // If the email and phone are unique or belong to the same contact, proceed with the update
    const updatedFields = req.body;
    const updatedContact = await contactmodel.findByIdAndUpdate(contactId, updatedFields, { new: true });
    res.json(updatedContact);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



/// DELETE CONTACT
app.delete('/deletecontact/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    await contactmodel.findByIdAndDelete(contactId);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
