import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function SyllabusCompletionPage() {
  const [formData, setFormData] = useState({
    className: '',
    semester: '',
    paperNo: '',
    paperTitle: '',
    month: '',
    syllabusPlanned: '',
    syllabusRemained: '',
    remark: '',
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.formData) {
      setFormData(state.formData); // Pre-fill form if editing
    }
  }, [state]);

  const classOptions = ['FY', 'SY', 'TY', 'MSc-1', 'MSc-2'];
  const semesterOptions = ['1', '2', '3', '4', '5', '6'];
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For the sake of this example, we save the form data in state and navigate to the view page
    navigate('/SyllabusCompletionView', { state: { formData } });
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
            Syllabus Completion Form
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* General Information Section */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
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
                <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Paper No"
                  name="paperNo"
                  value={formData.paperNo}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Paper Title"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  >
                    {monthOptions.map((option) => (
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
                  label="Planned Syllabus"
                  name="syllabusPlanned"
                  value={formData.syllabusPlanned}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Remaining Syllabus"
                  name="syllabusRemained"
                  value={formData.syllabusRemained}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
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

export default SyllabusCompletionPage;
