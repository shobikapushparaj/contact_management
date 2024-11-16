import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

const UserProfile = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth >
      <DialogTitle sx={{ textAlign: 'center',  paddingTop:'40px', color:'#1976d2', fontWeight:'bold',fontSize:'1.5rem'}}>User Profile</DialogTitle>
      <DialogContent style={{paddingLeft:'50px'}}>
        <Typography variant="body1">Name: User Name</Typography>
        <Typography variant="body1">Email: user@example.com</Typography>
        <Button onClick={handleClose} sx={{ marginTop: 3.5, width: '100%' ,color:'red',fontWeight:'bold',fontSize:'1rem'}}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
