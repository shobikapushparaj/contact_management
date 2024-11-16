import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });

  const navigate = useNavigate();

  // Fetch contacts on component mount and sort by first name
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getcontact');
        // Sort contacts by first name
        const sortedContacts = response.data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deletecontact/${id}`);
      const updatedContacts = contacts.filter(contact => contact._id !== id);
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Handle edit click
  const handleEditClick = (contact) => {
    setSelectedContact(contact._id);
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      jobTitle: contact.jobTitle
    });
    setEditDialogOpen(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update
  const handleUpdate = async () => {
    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }
  
    // Validate email
    if (!formData.email.includes('@')) {
      alert('Email must contain "@" symbol.');
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/updatecontact/${selectedContact}`, formData);
  
      // If the response indicates a duplicate email or phone, show an alert
      if (response.data.message) {
        alert(response.data.message); // Alert the user about the conflict
        return;
      }
  
      const updatedContacts = contacts.map(contact =>
        contact._id === selectedContact ? { ...contact, ...formData } : contact
      );
  
      // Sort contacts after update
      const sortedContacts = updatedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setContacts(sortedContacts);
      setFilteredContacts(sortedContacts);
      setEditDialogOpen(false);
      setSelectedContact(null);
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Display error message
      } else {
        console.error('Error updating contact:', error);
      }
    }
  };
  

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
  };

  // Navigate to Add Contact page
  const handleAddContactClick = () => {
    navigate('/body/add');
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" style={{ marginBottom: '40px', marginTop: '20px' }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            placeholder="Search by Name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <IconButton onClick={handleAddContactClick} style={{ backgroundColor: '#1976d2', color: 'white' }}>
            <Add />
          </IconButton>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(contact)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(contact._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Contact Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Company" name="company" value={formData.company} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewContacts;
