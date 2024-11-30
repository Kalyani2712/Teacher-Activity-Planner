import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function MOOCsContent({ data, onSave }) {
  const [moocData, setMoocData] = useState({
    id: '',
    programmeName: '',
    courseName: '',
    title: '',
    ictResources: '',
    dateImplemented: '',
    contentType: '',
    details: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Load data if editing an existing entry
  useEffect(() => {
    if (id) {
      const currentData = data.find(item => item.id === id);
      if (currentData) {
        setMoocData(currentData);
      }
    }
  }, [id, data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoocData({ ...moocData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(moocData); // Call the function passed via props to save data
    navigate('/MOOCsView');
  };

  // Cancel editing and navigate back
  const handleCancel = () => {
    navigate('/MOOCsView');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit MOOCs and E-Content' : 'Add New MOOCs and E-Content'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Programme Name"
                variant="outlined"
                name="programmeName"
                value={moocData.programmeName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Name"
                variant="outlined"
                name="courseName"
                value={moocData.courseName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="MOOCs/E-Content Title"
                variant="outlined"
                name="title"
                value={moocData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ICT Resources (e.g., YouTube, Weblink, Audio, Video, Telecast, Picture)"
                variant="outlined"
                name="ictResources"
                value={moocData.ictResources}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date Implemented/Approved"
                variant="outlined"
                name="dateImplemented"
                type="date"
                value={moocData.dateImplemented}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Content Type</InputLabel>
                <Select
                  name="contentType"
                  value={moocData.contentType}
                  onChange={handleChange}
                  label="Content Type"
                >
                  <MenuItem value="Video">Video</MenuItem>
                  <MenuItem value="Article">Article</MenuItem>
                  <MenuItem value="Interactive">Interactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details"
                variant="outlined"
                name="details"
                value={moocData.details}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {id ? 'Save Changes' : 'Add MOOC & E-Content'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="secondary" onClick={handleCancel} fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>``
    </Container>
  );
}

export default MOOCsContent;
