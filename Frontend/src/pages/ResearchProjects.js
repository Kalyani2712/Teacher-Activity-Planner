import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ResearchProjectEntry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    principalInvestigator: '',
    coInvestigators: '',
    projectTitle: '',
    duration: '',
    fundingAgency: '',
    amountSanctioned: '',
    dateOfSanction: '',
    status: 'Ongoing',
    dateOfSubmission: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., saving the data, API request, etc.)
    console.log('Form Data:', formData);
    navigate('/ResearchProjects');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)', // Professional gradient background
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
            Add New Research Project
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Principal Investigator */}
              <TextField
                label="Principal Investigator"
                variant="outlined"
                fullWidth
                name="principalInvestigator"
                value={formData.principalInvestigator}
                onChange={handleChange}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Co-Investigators */}
              <TextField
                label="Co-Investigators"
                variant="outlined"
                fullWidth
                name="coInvestigators"
                value={formData.coInvestigators}
                onChange={handleChange}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Project Title */}
              <TextField
                label="Project Title"
                variant="outlined"
                fullWidth
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Duration */}
              <TextField
                label="Duration"
                variant="outlined"
                fullWidth
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Funding Agency */}
              <TextField
                label="Funding Agency"
                variant="outlined"
                fullWidth
                name="fundingAgency"
                value={formData.fundingAgency}
                onChange={handleChange}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Amount Sanctioned */}
              <TextField
                label="Amount Sanctioned"
                variant="outlined"
                fullWidth
                name="amountSanctioned"
                value={formData.amountSanctioned}
                onChange={handleChange}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Date of Sanction */}
              <TextField
                label="Date of Sanction"
                type="date"
                variant="outlined"
                fullWidth
                name="dateOfSanction"
                value={formData.dateOfSanction}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Status */}
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                >
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>

              {/* Date of Submission */}
              <TextField
                label="Date of Submission"
                type="date"
                variant="outlined"
                fullWidth
                name="dateOfSubmission"
                value={formData.dateOfSubmission}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              />

              {/* Submit and Cancel Buttons */}
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    backgroundColor: '#3498db',
                    '&:hover': { backgroundColor: '#2980b9' },
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/ResearchProjects')}
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    '&:hover': { backgroundColor: '#e0e0e0' },
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default ResearchProjectEntry;
