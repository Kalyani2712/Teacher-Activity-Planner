import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ActivityReports() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activityType: '',
    title: '',
    objectives: '',
    studentsAttended: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/ActivityReportsView', { state: { formData } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">Activity Reports</Typography>
      </Box>

      {/* Form Section */}
      <Container sx={{ flexGrow: 1, paddingY: 4 }}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Activity Type"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Objectives"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="No. of Students Attended"
                  name="studentsAttended"
                  value={formData.studentsAttended}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Save Activity Report
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default ActivityReports;
