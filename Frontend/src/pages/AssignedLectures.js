import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box } from '@mui/material';

function AssignedLectures() {
  const [lectureData, setLectureData] = useState({
    className: '',
    courseName: '',
    theoryPeriods: '',
    practicals: '',
    totalPeriods: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assigned Lecture:', lectureData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Assigned Lectures
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Class Name"
                variant="outlined"
                name="className"
                value={lectureData.className}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Name"
                variant="outlined"
                name="courseName"
                value={lectureData.courseName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Theory Periods"
                variant="outlined"
                name="theoryPeriods"
                value={lectureData.theoryPeriods}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Practicals"
                variant="outlined"
                name="practicals"
                value={lectureData.practicals}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Total Periods"
                variant="outlined"
                name="totalPeriods"
                value={lectureData.totalPeriods}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Lecture Assignment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default AssignedLectures;
