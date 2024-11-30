import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

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

    // Simulate API request
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      const user = registeredUsers.find((user) => user.email === credentials.email && user.password === credentials.password);

      if (user) {
        localStorage.setItem('isLoggedIn', true);
        setLoading(false);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <a href="../Register">Register here</a>
        </Typography>
      </Box>
    </Container>
  );
}
    
export default Login;
