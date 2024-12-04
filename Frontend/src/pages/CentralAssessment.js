import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Paper,
  LinearProgress,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from 'react-router-dom';

function CentralAssessmentEntry() {
  const [formData, setFormData] = useState({
    teacherName: '',
    examinationName: '',
    class: '',
    subCourse: '',
    totalSets: '',
    translation: '',
    startDate: '',
    lastDate: '',
    totalAnswerBooksAssessed: '',
    noOfSupervisions: '',
  });

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      calculateProgress(updatedData);
      return updatedData;
    });
  };

  const calculateProgress = (data) => {
    const filledFields = Object.values(data).filter((value) => value.trim() !== '').length;
    setProgress((filledFields / Object.keys(data).length) * 100);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teacherName) newErrors.teacherName = 'Teacher name is required';
    if (!formData.examinationName) newErrors.examinationName = 'Examination name is required';
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.lastDate) newErrors.lastDate = 'Last date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Central Assessment Data:', formData);
      navigate('/CentralAssessmentView', { state: { formData } });
    }
  };

  const handleReset = () => {
    setFormData({
      teacherName: '',
      examinationName: '',
      class: '',
      subCourse: '',
      totalSets: '',
      translation: '',
      startDate: '',
      lastDate: '',
      totalAnswerBooksAssessed: '',
      noOfSupervisions: '',
    });
    setErrors({});
    setProgress(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: 6,
            backgroundColor: '#ffffff',
            position: 'relative',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 3 }}
          >
            Central Assessment Entry
          </Typography>

          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 3 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name of Teacher"
                  variant="outlined"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleChange}
                  error={!!errors.teacherName}
                  helperText={errors.teacherName}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter the teacher's full name.">
                          <InfoIcon color="action" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Examination Name"
                  variant="outlined"
                  name="examinationName"
                  value={formData.examinationName}
                  onChange={handleChange}
                  error={!!errors.examinationName}
                  helperText={errors.examinationName}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    error={!!errors.class}
                    sx={{ backgroundColor: '#f9f9f9' }}
                  >
                    <MenuItem value="FY">FY</MenuItem>
                    <MenuItem value="SY">SY</MenuItem>
                    <MenuItem value="TY">TY</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Sub/Course"
                  variant="outlined"
                  name="subCourse"
                  value={formData.subCourse}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Date"
                  type="date"
                  variant="outlined"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleChange}
                  error={!!errors.lastDate}
                  helperText={errors.lastDate}
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Total Answer Books Assessed"
                  variant="outlined"
                  name="totalAnswerBooksAssessed"
                  value={formData.totalAnswerBooksAssessed}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="No. of Supervisions"
                  variant="outlined"
                  name="noOfSupervisions"
                  value={formData.noOfSupervisions}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginY: 3 }} />
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                    startIcon={<RestartAltIcon />}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save Assessment Data
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default CentralAssessmentEntry;
