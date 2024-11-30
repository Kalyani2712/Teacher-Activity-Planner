import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ActivityReports() {
  const [activityData, setActivityData] = useState({
    activityType: '',
    description: '',
    date: '',
    className: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Activity Report:', activityData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Activity Reports
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  name="activityType"
                  value={activityData.activityType}
                  onChange={handleChange}
                  label="Activity Type"
                >
                  <MenuItem value="Practical">Practical</MenuItem>
                  <MenuItem value="Demo">Demo</MenuItem>
                  <MenuItem value="Group Activity">Group Activity</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={activityData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                variant="outlined"
                name="date"
                type="date"
                value={activityData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Class"
                variant="outlined"
                name="className"
                value={activityData.className}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                variant="outlined"
                name="remarks"
                value={activityData.remarks}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Activity Report
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default ActivityReports;
