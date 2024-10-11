import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // Import Axios for making HTTP requests

const InvestNowDialog = ({
  open,
  onClose,
  pricePerShare = 0,
  companyName = '',
  fundingRound = '',
  fundingRoundId, // Add this prop to get the fundingRoundId
  investorId, // Add this prop to get the investorId
}) => {
  const [shareAmount, setShareAmount] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const total = shareAmount ? shareAmount * pricePerShare : 0;
    setTotalCost(total);
  }, [shareAmount, pricePerShare]);

  // Clear state when dialog closes
  const handleClose = () => {
    setShareAmount('');
    setErrors({});
    onClose();
  };

  const handleShareAmountChange = (e) => {
    const shares = e.target.value;
    if (shares < 1) {
      setErrors((prev) => ({ ...prev, shareAmount: 'Please enter a valid number.' }));
    } else {
      setErrors((prev) => ({ ...prev, shareAmount: '' }));
    }
    setShareAmount(shares);
  };

  const handleConfirm = async () => {
    if (shareAmount <= 0) {
      setErrors((prev) => ({ ...prev, shareAmount: 'Please enter a valid number.' }));
      return;
    }

    try {
      // Make the PUT request to update the funding round with the investment details
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/funding-rounds/${fundingRoundId}/investment`,
        {
          shares: shareAmount,
          investorId: investorId, // Use the passed investor ID
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store token in localStorage
          },
        }
      );

      if (response.status === 200) {
        console.log('Investment successful', response.data);
        // Optionally, you can show a success message here
      } else {
        console.error('Investment failed', response);
        // Optionally, show an error message
      }
    } catch (error) {
      console.error('Error during investment:', error);
      // Optionally, show an error message
    }

    handleClose(); // Close dialog after confirmation
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'justify',
          position: 'relative',
          mt: 2,
          ml: 3,
        }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Invest in {companyName}
        </Typography>
        <IconButton
          edge="end"
          aria-label="close"
          sx={{ position: 'absolute', right: 15, top: -12, color: '#ED262A' }}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pl: 6, pr: 6 }}>
        <Grid container spacing={1}>
          {/* Investment Information */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom align="justify">
              You are about to invest in the <strong>{fundingRound}</strong> funding round conducted by{' '}
              <strong>{companyName}</strong>. The price per share is{' '}
              <strong>P{Number(pricePerShare).toLocaleString() || '0'}</strong>.
            </Typography>
          </Grid>

          {/* Shares Input */}
          <Grid item xs={12}>
            <Typography>Shares</Typography>
            <TextField
              margin="dense"
              id="share"
              type="number"
              fullWidth
              variant="outlined"
              placeholder="e.g., 2"
              value={shareAmount}
              onChange={handleShareAmountChange}
              helperText={errors.shareAmount}
              InputProps={{
                inputProps: { min: 1 },
              }}
              error={!!errors.shareAmount}
            />
          </Grid>

          {/* Investment Summary */}
          <Grid item xs={12}>
            <Box p={3} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Investment Summary
              </Typography>
              <Typography variant="body2" gutterBottom>
                You are buying <strong>{shareAmount || 0} shares</strong> at a price of{' '}
                <strong>P{pricePerShare ? Number(pricePerShare).toLocaleString() : '0'}</strong> per share.
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                Total cost: P{totalCost ? totalCost.toLocaleString() : '0'}
              </Typography>
            </Box>
          </Grid>

          {/* Disclaimer */}
          <Grid item xs={12}>
            <Typography variant="caption" align="justify" color="textSecondary" sx={{ mt: 2 }}>
              * By confirming this investment, you agree to the terms and conditions of the funding round. Please note
              that investments are subject to risk, and you should only invest what you can afford to lose.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          sx={{ px: 8 }}
          disabled={!shareAmount || shareAmount <= 0}
        >
          Confirm Investment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvestNowDialog;
