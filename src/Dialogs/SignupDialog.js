import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const SignupDialog = ({ open, onClose, email }) => {
    return (
        <Dialog open={open} onClose={onClose}
            PaperProps={{
                style: { borderRadius: 20, padding: '20px', maxWidth: '400px', textAlign: 'center' },
            }}>
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                    <EmailIcon sx={{ fontSize: 50, color: '#007490', marginBottom: '10px' }} /> 
                    <Typography variant="h6" sx={{ color: '#007490', fontWeight: 'bold' }}>
                        Email Confirmation Sent 
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography align="justify">
                    A confirmation email has been sent to <strong>{email}</strong>. Please check your email to complete your signup.
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default SignupDialog;