import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ParticipationEntry({ onSave }) {
  const [participationData, setParticipationData] = useState({
    eventType: '',
    title: '',
    organization: '',
    level: '',
    startDate: '',
    endDate: '',
    details: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipationData({ ...participationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(participationData);
    navigate('/ParticipationView'); // Redirect to Participation View page after saving
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)', // Gradient background
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
            Participation in Events/Conferences/Workshops
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Event Type */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Type"
                  variant="outlined"
                  name="eventType"
                  value={participationData.eventType}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={participationData.title}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Organization */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization"
                  variant="outlined"
                  name="organization"
                  value={participationData.organization}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Level Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    name="level"
                    value={participationData.level}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  >
                    <MenuItem value="International">International</MenuItem>
                    <MenuItem value="National">National</MenuItem>
                    <MenuItem value="State">State</MenuItem>
                    <MenuItem value="University">University</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Start Date */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Start Date"
                  variant="outlined"
                  name="startDate"
                  type="date"
                  value={participationData.startDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="End Date"
                  variant="outlined"
                  name="endDate"
                  type="date"
                  value={participationData.endDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Details */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Details"
                  variant="outlined"
                  name="details"
                  value={participationData.details}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Save Button */}
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
                  Save Participation
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default ParticipationEntry;
