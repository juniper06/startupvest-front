import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { AccountBalance } from '@mui/icons-material'; 

// Background animation
const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

// Spinner rotation animation
const spinnerRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default function Loading() {
  return (
    <Container maxWidth={false} disableGutters 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: 'linear-gradient(135deg, #004A98, #005d64)', 
        backgroundSize: '300% 300%', 
        animation: `${backgroundAnimation} 8s ease infinite`,
        boxShadow: 10, 
        padding: 3,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>

      <Box sx={{ mb: 2 }}>
        <AccountBalance sx={{ fontSize: '4rem', color: '#ffffff', filter: 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))' }} />
      </Box>

      <Typography variant="h4" sx={{  mb: 1,  fontWeight: 'bold',  color: '#ffffff', textAlign: 'center', filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))' }}>
        Logging in, please wait...
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, color: '#ffffff', textAlign: 'center', maxWidth: '400px', filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))' }}>
        We’re preparing a personalized investment experience for you.
      </Typography>

      <Box sx={{ position: 'relative', width: '80px', height: '80px', border: '8px solid transparent', borderTop: '8px solid #ffffff', borderRadius: '50%', 
          animation: `${spinnerRotation} 1.5s linear infinite`, filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.5))'}} />

      <Typography variant="caption" sx={{ marginTop: 3, color: '#ffffff', textAlign: 'center' }}>Please do not close this window.</Typography>
    </Container>
  );
}