import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
    <Container maxWidth="xl">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Syllabus Completion Form
        </Typography>

        <Paper sx={{ padding: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Paper No"
                  name="paperNo"
                  value={formData.paperNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Paper Title"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Planned Syllabus"
                  name="syllabusPlanned"
                  value={formData.syllabusPlanned}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Remaining Syllabus"
                  name="syllabusRemained"
                  value={formData.syllabusRemained}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 3 }}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Record
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default SyllabusCompletionPage;
