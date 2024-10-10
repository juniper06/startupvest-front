import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button, 
  Typography 
} from '@mui/material';

const InvestorConfirmationDialog = ({ open, onClose, onConfirm, companyName }) => {
  const [cancelSuccessDialogOpen, setCancelSuccessDialogOpen] = useState(false);

  const handleConfirmCancel = async () => {
    await onConfirm();
    setCancelSuccessDialogOpen(true); 
    onClose();
  };

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog 
        open={open} 
        onClose={onClose} 
        aria-labelledby="cancel-dialog-title" 
        aria-describedby="cancel-dialog-description" 
        maxWidth="sm" 
        fullWidth>
        <DialogTitle id="cancel-dialog-title" sx={{ bgcolor: '#f44336', color: 'white', mb: 3 }}>
          <Typography variant="h6">Cancel Investment Request</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel the investment request for <strong>{companyName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={onClose} 
            sx={{ color: '#f44336', '&:hover': { backgroundColor: '#fce4e4' } }}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmCancel} 
            sx={{ color: '#4caf50', '&:hover': { backgroundColor: '#e8f5e9' } }}
            autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog 
        open={cancelSuccessDialogOpen} 
        onClose={() => setCancelSuccessDialogOpen(false)} 
        aria-labelledby="success-dialog-title" 
        aria-describedby="success-dialog-description" 
        maxWidth="sm" 
        fullWidth>
        <DialogTitle id="success-dialog-title" sx={{ bgcolor: '#4caf50', color: 'white', mb: 3 }}>
          <Typography variant="h6">Cancellation Successful</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            The investment request for <strong>{companyName}</strong> has been successfully canceled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setCancelSuccessDialogOpen(false)} 
            sx={{ color: '#4caf50', '&:hover': { backgroundColor: '#e8f5e9' } }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvestorConfirmationDialog;
