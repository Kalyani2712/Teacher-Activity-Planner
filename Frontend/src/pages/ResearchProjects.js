import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
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
    status: 'Ongoing', // default status
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
    // Navigate back to the project list or any other page after submitting
    navigate('/ResearchProjects');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
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
            />

            {/* Co-Investigators */}
            <TextField
              label="Co-Investigators"
              variant="outlined"
              fullWidth
              name="coInvestigators"
              value={formData.coInvestigators}
              onChange={handleChange}
            />

            {/* Project Title */}
            <TextField
              label="Project Title"
              variant="outlined"
              fullWidth
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
            />

            {/* Duration */}
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />

            {/* Funding Agency */}
            <TextField
              label="Funding Agency"
              variant="outlined"
              fullWidth
              name="fundingAgency"
              value={formData.fundingAgency}
              onChange={handleChange}
            />

            {/* Amount Sanctioned */}
            <TextField
              label="Amount Sanctioned"
              variant="outlined"
              fullWidth
              name="amountSanctioned"
              value={formData.amountSanctioned}
              onChange={handleChange}
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
            />

            {/* Status */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
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
            />

            {/* Submit Button */}
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ fontWeight: 'bold' }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/ResearchProjects')}
                sx={{ fontWeight: 'bold' }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default ResearchProjectEntry;
