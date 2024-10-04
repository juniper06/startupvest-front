import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

const LandingPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container maxWidth="xxl" sx={{  display: 'flex',  flexDirection: 'column',  alignItems: 'center',  justifyContent: 'center', 
        position: 'relative', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <Box component="img" src="/images/logoStartUp.png" alt="Startup Vest Logo" sx={{ width: '15%', height: 'auto', ml: 15 }}/>
          <Box>
            <Button component={Link} to="/login" variant="text" color="primary" sx={{ mr: 2, color: '#007490' }}>
              Login
            </Button>

            <Button component={Link} to="/signup" variant="contained"
              sx={{ backgroundImage: 'linear-gradient(45deg, #F1CC0A, #EDA61C)', color: '#FFFFFF', mr: 15 }}>
              Signup
            </Button>
          </Box>
        </Box>

      {isLargeScreen && (
        <>
          {/* Top Right Border Design */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '50%',
              height: '15px',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 0 0 10px',
              zIndex: 10,
            }}/>

          <Box sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '25px',
              height: '50%',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 0 0 10px',
              zIndex: 10,
            }}/>

          {/* Bottom Left Border Design */}
          <Box sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '50%',
              height: '15px',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 10px 0 0',
              zIndex: 10,
            }}/>

          <Box sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '25px',
              height: '50%',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 10px 0 0',
              zIndex: 10,
            }}/>
        </>
      )}

      <Grid container sx={{ pl: 15}}>
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' },  height: '100%', textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mt: 8 }}>
              Turn Bold Ideas <br/> Into Startup Reality!
            </Typography>

            <Typography variant="h6" align="justify" paragraph sx={{ color: '#373737', mr: 5, mt: 2 }}>
              Our application equips startup owners with essential tools for effective funding management. Users can access key metrics like the highest-funded companies, top investors, and total funding amounts. They can also track investor counts, review funding rounds, and visualize monthly funding trends.
            </Typography>

            <Typography variant="h6" align="justify" paragraph sx={{ color: '#373737', mr: 5 }}>
              For investors, the app streamlines investment monitoring by highlighting top companies, tracking investment counts, analyzing average investment sizes, and allowing users to track the specific companies they have invested in.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Box component="img" src="/images/startup_illustration.png" alt="Startup Illustration" sx={{ width: '90%' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
