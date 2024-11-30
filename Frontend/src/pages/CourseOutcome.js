import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box } from '@mui/material';

function CourseOutcome() {
  const [courseData, setCourseData] = useState({
    courseName: '',
    learningOutcomes: '',
    assessmentMethod: '',
    achievementLevel: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Outcome:', courseData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Measurement of Course Outcome
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Name"
                variant="outlined"
                name="courseName"
                value={courseData.courseName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Learning Outcomes"
                variant="outlined"
                name="learningOutcomes"
                value={courseData.learningOutcomes}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assessment Method"
                variant="outlined"
                name="assessmentMethod"
                value={courseData.assessmentMethod}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Achievement Level"
                variant="outlined"
                name="achievementLevel"
                value={courseData.achievementLevel}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Feedback"
                variant="outlined"
                name="feedback"
                value={courseData.feedback}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Course Outcome
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default CourseOutcome;
