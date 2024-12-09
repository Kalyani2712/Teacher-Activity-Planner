import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignedLectures = () => {
  const [lectureData, setLectureData] = useState({
    t_id: localStorage.getItem("id"),
    className: '',
    courseName: '',
    theoryPeriods: '',
    practicals: '',
    totalPeriods: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure numbers only for relevant fields
    if (
      ['theoryPeriods', 'practicals', 'totalPeriods'].includes(name) &&
      value !== '' &&
      !/^\d+$/.test(value)
    ) {
      return; // Prevent non-numeric inputs
    }

    setLectureData({ ...lectureData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const { className, courseName, theoryPeriods, practicals, totalPeriods } = lectureData;
    if (!className || !courseName || !theoryPeriods || !practicals || !totalPeriods) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:5000/assignedlectures', lectureData).catch((error) => {
      console.log(error);
    });

    // Navigate to Assigned Lectures View with the form data
    navigate('/assigned-lectures-view');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)',
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
            Assign Lectures
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Class Name"
                  variant="outlined"
                  name="className"
                  value={lectureData.className}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
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
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
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
                  required
                  type="number"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  inputProps={{ min: 0 }}
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
                  required
                  type="number"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  inputProps={{ min: 0 }}
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
                  required
                  type="number"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  inputProps={{ min: 0 }}
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
                  Save Lecture Assignment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AssignedLectures;
