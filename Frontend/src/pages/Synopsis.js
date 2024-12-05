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
  Tooltip,
  InputAdornment,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from 'react-router-dom';

function Synopsis() {
  const [synopsisData, setSynopsisData] = useState({
    plannedTopics: '',
    topicsCovered: '',
    deviations: '',
    comments: ''
  });

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSynopsisData((prev) => {
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
    if (!synopsisData.plannedTopics) newErrors.plannedTopics = 'Planned topics are required';
    if (!synopsisData.topicsCovered) newErrors.topicsCovered = 'Topics covered are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Synopsis Data:', synopsisData);
      // Navigate to SynopsisView and pass the data as state
      navigate('/SynopsisView', { state: { synopsisData } });
    }
  };

  const handleReset = () => {
    setSynopsisData({
      plannedTopics: '',
      topicsCovered: '',
      deviations: '',
      comments: ''
    });
    setErrors({});
    setProgress(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ padding: 4, borderRadius: 4, boxShadow: 6, backgroundColor: '#ffffff', position: 'relative' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 3 }}>
            Synopsis of Teaching
          </Typography>

          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 3 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Planned Topics"
                  variant="outlined"
                  name="plannedTopics"
                  value={synopsisData.plannedTopics}
                  onChange={handleChange}
                  error={!!errors.plannedTopics}
                  helperText={errors.plannedTopics}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter the planned topics for the class.">
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
                  label="Topics Covered"
                  variant="outlined"
                  name="topicsCovered"
                  value={synopsisData.topicsCovered}
                  onChange={handleChange}
                  error={!!errors.topicsCovered}
                  helperText={errors.topicsCovered}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Deviations"
                  variant="outlined"
                  name="deviations"
                  value={synopsisData.deviations}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comments"
                  variant="outlined"
                  name="comments"
                  value={synopsisData.comments}
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
                    Save Synopsis
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

export default Synopsis;
