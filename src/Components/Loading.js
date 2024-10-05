import * as React from 'react';
import { Stack, CircularProgress, Container, Typography, Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Pulse animation for the spinner
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export default function Loading() {
  return (
    <Container 
      maxWidth={false}
      disableGutters 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: 'linear-gradient(135deg, #e0f7fa 30%, #80deea 90%)',
        borderRadius: 0, 
        boxShadow: 0,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>

      <Typography  variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#007490' }}>
        Logging in, please wait...
      </Typography>
      
      <Typography  variant="body1" sx={{ mb: 2, color: '#005d64' }} >
        We are preparing your personalized experience...
      </Typography>
      <Stack spacing={2} direction="row">
        <Box sx={{ animation: `${pulse} 1.5s infinite` }}> 
          <CircularProgress color="primary" size="5rem" sx={{ color: '#007490' }} />
        </Box>
      </Stack>
    
      <Typography variant="caption" sx={{ marginTop: 2, color: '#004d54' }}>
        Please do not close this window.
      </Typography>
    </Container>
  );
}