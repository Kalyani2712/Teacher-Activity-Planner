import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ContributionsEntry({ onSave }) {
  const [contributionData, setContributionData] = useState({
    contributionType: '',
    title: '',
    organization: '',
    level: '',
    startDate: '',
    endDate: '',
    details: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContributionData({ ...contributionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contributionData);
    navigate('/ContributionsView'); // Redirect to Contributions View page after saving
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contribution to Conferences/Workshops/Seminar/shortTermCourse
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            {/* Contribution Type as TextField */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contribution Type"
                variant="outlined"
                name="contributionType"
                value={contributionData.contributionType}
                onChange={handleChange}
              />
            </Grid>

            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                value={contributionData.title}
                onChange={handleChange}
              />
            </Grid>

            {/* Organization */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization"
                variant="outlined"
                name="organization"
                value={contributionData.organization}
                onChange={handleChange}
              />
            </Grid>

            {/* Level dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={contributionData.level}
                  onChange={handleChange}
                  label="Level"
                >
                  <MenuItem value="International">International</MenuItem>
                  <MenuItem value="National">National</MenuItem>
                  <MenuItem value="State">State</MenuItem>
                  <MenuItem value="University">University</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start Date"
                variant="outlined"
                name="startDate"
                type="date"
                value={contributionData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Date"
                variant="outlined"
                name="endDate"
                type="date"
                value={contributionData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Details */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details"
                variant="outlined"
                name="details"
                value={contributionData.details}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Contribution
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default ContributionsEntry;
