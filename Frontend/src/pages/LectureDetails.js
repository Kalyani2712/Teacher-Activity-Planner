import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box } from '@mui/material';

function LectureDetails() {
  const [lectureData, setLectureData] = useState({
    date: '',
    className: '',
    subject: '',
    lectureTopic: '',
    duration: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lecture Details:', lectureData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Lecture Details
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                variant="outlined"
                name="date"
                type="date"
                value={lectureData.date}
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
                value={lectureData.className}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                name="subject"
                value={lectureData.subject}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lecture Topic"
                variant="outlined"
                name="lectureTopic"
                value={lectureData.lectureTopic}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration"
                variant="outlined"
                name="duration"
                value={lectureData.duration}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                variant="outlined"
                name="remarks"
                value={lectureData.remarks}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Lecture Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default LectureDetails;
