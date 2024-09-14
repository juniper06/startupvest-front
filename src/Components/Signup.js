import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, TextField, Button, Select, MenuItem, FormControl, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styles } from '../styles/Signup';

function Signup() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [openAlert, setOpenAlert] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      email: e.target.elements.email.value,
      contactNumber: e.target.elements.contactNumber.value,
      gender: e.target.elements.gender.value,
      password: e.target.elements.password.value,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError('Please enter a valid email address with a domain (e.g., .com, .net).');
      return;
    } else {
      setError('');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#-])[A-Za-z\d@$!%*?&#-]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      setPasswordError(
        'Password must be 8+ characters, with uppercase, lowercase, number, and special character.'
      );
      return;
    } else {
      setPasswordError('');
    }

    if (emailExists) {
      setError('Email already exists. Please enter a different email.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/users/register',
        userData
      );
      console.log('Signup successful:', response.data);
      setOpenAlert(true); 
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    }
  };

  const checkEmailExists = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/check-email', {
        email,
      });
      setEmailExists(response.data.exists);
      setError(response.data.exists ? 'Email already exists. Please enter a different email.' : '');
    } catch (error) {
      console.error('Error checking email:', error);
      setError('Error checking email. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div style={styles.container}>
      <Grid container>
        <Grid item xs={12} sm={1} sx={styles.sideBar}>
        </Grid>

        <Grid item xs={12} sm={6} sx={styles.titleContainer}>
          <Typography sx={styles.title}>
            "Empowering <br /> Startups, <br /> Tracking <br /> Investments"
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} sx={styles.formContainer}>
          <Typography variant="h5" component="header" sx={styles.formTitle}>
            Create Account
          </Typography>

          <form onSubmit={handleSubmit} className="signup-form">
            <Grid container spacing={2} className="signup-details">
              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>First Name</Typography>
                <TextField fullWidth name="firstName" placeholder="John" required sx={styles.textField} />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>Last Name</Typography>
                <TextField fullWidth name="lastName" placeholder="Doe" required sx={styles.textField} />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ color: '#F2F2F2' }}>Email</Typography>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  required
                  value={email}
                  error={emailExists || !!error}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={checkEmailExists}
                  sx={styles.textField} />
                {error && (
                  <Typography sx={styles.errorText}>
                    {error}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>Phone Number</Typography>
                <TextField fullWidth name="contactNumber" placeholder="09362677352" type="tel" required sx={styles.textField} />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>Gender</Typography>
                <FormControl fullWidth>
                  <Select name="gender" sx={styles.select} defaultValue='Select Gender'>
                    <MenuItem value="Select Gender" disabled>Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ color: '#F2F2F2' }}>Password</Typography>
                <TextField
                  fullWidth
                  name="password"
                  placeholder="Your Password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!passwordError}
                  required
                  sx={styles.passwordField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ p: '10px' }}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}/>
                {passwordError && (
                  <Typography sx={styles.errorText}>
                    {passwordError}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Button type="submit" fullWidth sx={styles.submitButton}>
              Sign up
            </Button>

            <Typography sx={styles.titleLink}>
              Already have an account?{' '}
              <Link to="/login" style={styles.linkText}>
                Sign in
              </Link>
            </Typography>
          </form>
        </Grid>
      </Grid>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity="success" sx={styles.snackbar}>
          Login successful! Redirecting to homepage...
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;