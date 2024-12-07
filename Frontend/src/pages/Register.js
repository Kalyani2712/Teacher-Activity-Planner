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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeacherRegistration() {
  const [formData, setFormData] = useState({
    teacherName: '',
    designation: '',
    qualification: '',
    faculty: '',
    department: '',
    dateOfBirth: '',
    email: '',
    residentialAddress: '',
    permanentAddress: '',
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
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:5000/register', {
        t_id: Date.now(), 
        name: formData.teacherName,
        email: formData.email,
        password: formData.email.substring(0, 3)+"123",
        designation: formData.designation,
        qualification: formData.qualification,
        faculty: formData.faculty,
        department: formData.department,
        DOB: formData.dateOfBirth,
        phoneNo: formData.contactNumber,
        res_address: formData.residentialAddress,
        per_address: formData.permanentAddress
      }).then(res => {
        localStorage.setItem('id', res.data);
        window.location.href = '/dashboard'
        navigate('/Profile', { state: { formData } });
      }).catch(error => {
        setErrors({email: 'Email already exists'});
        console.log(error);
      })
    }
  };

  const handleReset = () => {
    setFormData({
      teacherName: '',
      designation: '',
      qualification: '',
      faculty: '',
      department: '',
      dateOfBirth: '',
      email: '',
      residentialAddress: '',
      permanentAddress: '',
    });
    setErrors({});
    setProgress(0);
  };

  const handleBack = () => {
    navigate(-1);
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
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ marginBottom: 2, color: '#1976d2' }}
          >
            Back
          </Button>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 3 }}
          >
            Teacher Registration
            {/* {error && <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>{error}</Typography>} */}
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

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  variant="outlined"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  variant="outlined"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Faculty"
                  variant="outlined"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Department"
                  variant="outlined"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Residential Address"
                  variant="outlined"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Permanent Address"
                  variant="outlined"
                  name="permanentAddress"
                  value={formData.permanentAddress}
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
                    Save Registration Data
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

export default TeacherRegistration;
