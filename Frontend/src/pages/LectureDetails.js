import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  LinearProgress,
  Paper,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from 'react-router-dom';

function LectureDetails() {
  const [lectureData, setLectureData] = useState({
    date: '',
    className: '',
    subject: '',
    lectureTopic: '',
    duration: '',
    remarks: '',
  });

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prev) => {
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
    if (!lectureData.date) newErrors.date = 'Date is required';
    if (!lectureData.className) newErrors.className = 'Class is required';
    if (!lectureData.subject) newErrors.subject = 'Subject is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Lecture Details:', lectureData);
      // Navigate to the view page and pass the lectureData as state
      navigate('/LectureDetailsView', { state: { lectureData } });
    }
  };

  const handleReset = () => {
    setLectureData({
      date: '',
      className: '',
      subject: '',
      lectureTopic: '',
      duration: '',
      remarks: '',
    });
    setErrors({});
    setProgress(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ padding: 4, borderRadius: 4, boxShadow: 6, backgroundColor: '#ffffff' }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 3 }}
          >
            Lecture Details Entry
          </Typography>

          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 3 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  name="date"
                  type="date"
                  value={lectureData.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9' }}
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
                  error={!!errors.className}
                  helperText={errors.className}
                  sx={{ backgroundColor: '#f9f9f9' }}
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
                  error={!!errors.subject}
                  helperText={errors.subject}
                  sx={{ backgroundColor: '#f9f9f9' }}
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
                  sx={{ backgroundColor: '#f9f9f9' }}
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
                  sx={{ backgroundColor: '#f9f9f9' }}
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
                    Save Lecture Details
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default LectureDetails;
