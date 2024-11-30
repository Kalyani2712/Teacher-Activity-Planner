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
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Participation in Events/Conferences/Workshops
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            {/* Event Type */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Type"
                variant="outlined"
                name="eventType"
                value={participationData.eventType}
                onChange={handleChange}
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
                  label="Level"
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
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
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
              />
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Participation
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default ParticipationEntry;
