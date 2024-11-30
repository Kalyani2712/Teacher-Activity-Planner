import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

const CommitteeWorkEntry = ({ onSave }) => {
  const [formData, setFormData] = useState({
    committeeName: '',
    role: '',
    level: '',
    description: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.entry; // Retrieve initial data if passed via navigation

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    navigate('/committees-view'); // Redirect to the view page after saving
  };

  // Load initial data for editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        committeeName: initialData.committeeName || '',
        role: initialData.role || '',
        level: initialData.level || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)', // Professional gradient background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}
          >
            {initialData ? 'Edit Committee Work' : 'Add Committee Work'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Committee Name"
                  variant="outlined"
                  name="committeeName"
                  value={formData.committeeName}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  variant="outlined"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  >
                    <MenuItem value="College Level">College Level</MenuItem>
                    <MenuItem value="University Level">University Level</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    backgroundColor: '#3498db',
                    '&:hover': { backgroundColor: '#2980b9' },
                  }}
                >
                  {initialData ? 'Update Work' : 'Save Work'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

CommitteeWorkEntry.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CommitteeWorkEntry;
