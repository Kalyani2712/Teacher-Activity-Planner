import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Fade,
  InputAdornment,
  IconButton,
  Divider,
  LinearProgress,
} from '@mui/material';
import { Email, Phone, Edit, Save, Cancel } from '@mui/icons-material';
import axios from 'axios';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    qualification: '',
    faculty: '',
    department: '',
    contactNumber: '',
    email: '',
    residentialAddress: '',
    permanentAddress: ''
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load the user data from localStorage
  useEffect(() => {
    axios.get('http://localhost:5000/info/' + localStorage.getItem('id')).then(res => {
      setFormData({
        name: res.data[0].name,
        designation: res.data[0].designation,
        qualification: res.data[0].qualification,
        faculty: res.data[0].faculty,
        department: res.data[0].department,
        contactNumber: res.data[0].phoneNo,
        email: res.data[0].email,
        residentialAddress: res.data[0].res_address,
        permanentAddress: res.data[0].per_address
      });
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    calculateProgress({ ...formData, [name]: value });
  };

  const calculateProgress = (data) => {
    const filledFields = Object.values(data).filter((value) => value.trim() !== '').length;
    setProgress((filledFields / Object.keys(data).length) * 100);
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'permanentAddress' && key !== 'residentialAddress') {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact Number must be 10 digits';
    }
    return errors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    setSuccessMessage('');

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      setLoading(false);
      return;
    }

    // Save updated data to localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Profile updated successfully!');
      setOpenSnackbar(true);
      setIsEditing(false);
    }, 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    setIsEditing(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ padding: 4, borderRadius: 4, boxShadow: 6, backgroundColor: '#ffffff' }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 3 }}
          >
            Profile
          </Typography>

          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 3 }} />

          <Card elevation={3} sx={{ width: '100%' }}>
            <Fade in timeout={500}>
              <Box>
                {!isEditing ? (
                  <CardContent>
                    <Grid container spacing={2}>
                      {Object.entries(formData).map(([key, value]) => (
                        <Grid item xs={12} key={key}>
                          <Typography variant="subtitle1" color="textSecondary">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </Typography>
                          <Typography variant="body1">{value || 'N/A'}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                ) : (
                  <form onSubmit={handleSave} style={{ width: '100%' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        {Object.keys(formData).map((field) => (
                          <Grid item xs={12} key={field}>
                            <TextField
                              fullWidth
                              label={field.charAt(0).toUpperCase() + field.slice(1)}
                              variant="outlined"
                              name={field}
                              value={formData[field]}
                              onChange={handleChange}
                              error={Boolean(error[field])}
                              helperText={error[field] || ''}
                              required={field !== 'residentialAddress' && field !== 'permanentAddress'}
                              multiline={field.includes('Address')}
                              rows={field.includes('Address') ? 2 : 1}
                              InputProps={{
                                startAdornment: field === 'email' ? (
                                  <InputAdornment position="start">
                                    <Email />
                                  </InputAdornment>
                                ) : field === 'contactNumber' ? (
                                  <InputAdornment position="start">
                                    <Phone />
                                  </InputAdornment>
                                ) : null,
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </form>
                )}
                <CardActions>
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Edit />}
                      onClick={handleEdit}
                    >
                      Edit/Change
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                        startIcon={<Save />}
                        onClick={handleSave}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        disabled={loading}
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </Box>
            </Fade>
          </Card>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity="success"
              sx={{ width: '100%' }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
}

export default Profile;
