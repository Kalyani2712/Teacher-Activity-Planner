import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

const LeaveRecordsEntry = ({ onSave }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    numberOfDays: '',
    reason: '',
  });

  const navigate = useNavigate();
  const location = useLocation(); // Accessing the data passed via navigate

  const initialData = location.state?.entry; // Retrieve the initial data from state if it exists

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send formData to parent
    navigate('/leave-records-view'); // Redirect to view page after saving
  };

  // Load initial data for editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        leaveType: initialData.leaveType || '',
        fromDate: initialData.fromDate || '',
        toDate: initialData.toDate || '',
        numberOfDays: initialData.numberOfDays || '',
        reason: initialData.reason || '',
      });
    }
  }, [initialData]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #1D2B64, #F8CDDA)',
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333333',
              marginBottom: 3,
            }}
          >
            {initialData ? 'Edit Leave Record' : 'Add Leave Record'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Leave Type</InputLabel>
                  <Select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                    <MenuItem value="Duty Leave">Duty Leave</MenuItem>
                    <MenuItem value="Other Leave">Other Leave</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="From Date"
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="To Date"
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Number of Days"
                  type="number"
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    padding: '12px 0',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    backgroundColor: '#333333',
                    '&:hover': { backgroundColor: '#555555' },
                  }}
                >
                  {initialData ? 'Update Record' : 'Save Record'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

LeaveRecordsEntry.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default LeaveRecordsEntry;
