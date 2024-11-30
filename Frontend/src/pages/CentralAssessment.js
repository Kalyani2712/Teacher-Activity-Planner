import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CentralAssessment() {
  const [assessmentData, setAssessmentData] = useState({
    assessmentType: '',
    course: '',
    date: '',
    totalMarks: '',
    marksObtained: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData({ ...assessmentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assessment Data:', assessmentData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Central Assessment Programme
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assessment Type</InputLabel>
                <Select
                  name="assessmentType"
                  value={assessmentData.assessmentType}
                  onChange={handleChange}
                  label="Assessment Type"
                >
                  <MenuItem value="Quiz">Quiz</MenuItem>
                  <MenuItem value="Exam">Exam</MenuItem>
                  <MenuItem value="Project">Project</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course"
                variant="outlined"
                name="course"
                value={assessmentData.course}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                variant="outlined"
                name="date"
                type="date"
                value={assessmentData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Total Marks"
                variant="outlined"
                name="totalMarks"
                value={assessmentData.totalMarks}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Marks Obtained"
                variant="outlined"
                name="marksObtained"
                value={assessmentData.marksObtained}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Assessment Data
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default CentralAssessment;
