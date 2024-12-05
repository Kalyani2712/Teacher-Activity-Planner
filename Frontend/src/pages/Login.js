import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  if (isLoggedIn) {
    window.location.href = '/dashboard';;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    const data = {
      email: credentials.email,
      password: credentials.password
    }

    axios.post('http://localhost:5000/auth', data).then(res => {
      localStorage.setItem('id', res.data);
      window.location.href = '/dashboard';
    }).catch(error => {
      console.log(error, credentials.email, credentials.password);
      setError('Invalid email or password');
      setLoading(false);
    });
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #FF6F61, #D1A8E1)' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        {/* Left side: Logo */}
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 4 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '120%' }}>
            <img src="../TDAPLogo.png" alt="Teacher's Daily Activity Planner Logo" style={{ maxWidth: '80%' }} />
          </Box>
        </Grid>

        {/* Right side: Login Form */}
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
          <Box sx={{ width: '80%', maxWidth: 400, backgroundColor: 'white', padding: 4, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#FF6F61' }}>Login</Typography>
            {error && <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>{error}</Typography>}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    autoFocus
                    required
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading} sx={{ borderRadius: 2, padding: '10px 0' }}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center', color: '#616161' }}>
              Don't have an account? <Link to="/Register" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
