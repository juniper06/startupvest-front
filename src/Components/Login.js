// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, TextField, Button, Link, Paper, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginStyles from '../styles/Login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);
  const navigate = useNavigate();

  // Adjust zoom level on window resize (for detecting zoom changes)
  useEffect(() => {
    const handleResize = () => {
      setZoomLevel(window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(`http://localhost:3000/users/login`, {
            email,
            password,
        });

        // Check if the response contains the necessary data
        if (response.data && response.data.jwt) {
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('role', response.data.role); 

            setLoggedIn(true);

            setTimeout(() => {
                if (response.data.role === 'admin') {
                    navigate('/admindashboard');
                } else {
                    navigate('/asCompanyOwnerOverview');
                }
            }, 1000);
        } else {
            throw new Error('Invalid login response');
        }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Incorrect email or password');
    }
  };

  const isEmailRegistered = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/users/check-email`, {
        email,
      });
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const scaleFactor = zoomLevel >= 1.25 ? 0.85 : 1; 

  return (
    <Container sx={{ ...LoginStyles.container, transform: `scale(${scaleFactor})`, }}>
      <Grid container>
        {/* Left Side Content */}
        <Grid item  xs={12} sm={7} sx={LoginStyles.leftSideGrid}>
          <Paper elevation={3} sx={LoginStyles.leftSidePaper}>
            <Typography variant="h4" sx={LoginStyles.leftSideTypography}>
              Welcome back! <br /> Excited to have you again. <br /> Sign in to get back on track!
            </Typography>
            <Typography variant="h6" sx={LoginStyles.leftSideSubtitle}>
              "Empowering Startups, Tracking Investments"
            </Typography>
            <img src="images/picture.jpg" alt="Startup Vest Logo"style={LoginStyles.leftSideImage}/>
          </Paper>
        </Grid>

        {/* LOGIN FORM */}
        <Grid item xs={12} sm={5} sx={LoginStyles.formContainer}>
          <img src="images/logo.png" alt="Logo" style={LoginStyles.logoImage}/>
          <Paper elevation={3} sx={LoginStyles.formPaper}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',}}>
              <Typography variant="h5" sx={LoginStyles.formHeading}>Sign In</Typography>
              {error && ( <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>{error}
              </Typography>
              )}

              <Typography sx={{ color: '#007490', mb: -1 }}>Email</Typography>
              <TextField type="text" placeholder="johndoe@gmail.com" required value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailExists(false);
                  setError('');
                }}
                onBlur={isEmailRegistered} fullWidth margin="normal" sx={LoginStyles.formInput}/>

              <Typography sx={{ color: '#007490', mt: 1.5, mb: 1 }}>Password</Typography>
              <TextField type={showPassword ? 'text' : 'password'}
                placeholder="Example123" required value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }} fullWidthmargin="normal" sx={LoginStyles.formInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility} edge="end" size="small">
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}/>

              <Typography variant="body2" sx={LoginStyles.forgotPasswordText}>
                Forgot password?
              </Typography>

              <Button type="submit" variant="contained" color="primary" sx={LoginStyles.formSubmitButton}>Sign In</Button>

              <div style={{ marginTop: '16px' }}>
                <Typography variant="body2" sx={LoginStyles.signUpText}>
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/signup" sx={LoginStyles.signUpLink}>
                    Sign Up
                  </Link>
                </Typography>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;