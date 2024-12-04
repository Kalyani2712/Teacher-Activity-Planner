import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CourseOutcomePage() {
  const [formData, setFormData] = useState({
    className: '',
    year: '',
    semester: '',
    courseTitle: '',
    outcome: '',
    assessmentMethod: '',
    percentAttainment: '',
  });

  const navigate = useNavigate();

  const classOptions = ['FY', 'SY', 'TY', 'MSc-1', 'MSc-2'];
  const yearOptions = ['2024', '2025', '2026']; // Example options for year
  const semesterOptions = ['1', '2', '3', '4', '5', '6'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/CourseOutcomeView', { state: { formData } });
  };

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
      <Container maxWidth="md">
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
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#2C3E50',
              marginBottom: 3,
            }}
          >
            Course Outcome Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                  >
                    {classOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  >
                    {yearOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>
                  <Select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                  >
                    {semesterOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Course Title"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Outcome"
                  name="outcome"
                  value={formData.outcome}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Assessment Method"
                  name="assessmentMethod"
                  value={formData.assessmentMethod}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="% Attainment of CO"
                  name="percentAttainment"
                  value={formData.percentAttainment}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  inputProps={{ type: 'number', min: 0 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 4 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  padding: '12px 0',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  backgroundColor: '#2C3E50',
                  '&:hover': { backgroundColor: '#1A252F' },
                }}
              >
                Save Record
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default CourseOutcomePage;
