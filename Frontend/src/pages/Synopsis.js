import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box } from '@mui/material';

function Synopsis() {
  const [synopsisData, setSynopsisData] = useState({
    plannedTopics: '',
    topicsCovered: '',
    deviations: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSynopsisData({ ...synopsisData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Synopsis:', synopsisData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Synopsis of Teaching
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Planned Topics"
                variant="outlined"
                name="plannedTopics"
                value={synopsisData.plannedTopics}
                onChange={handleChange}
                multiline
                rows={4}
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
                multiline
                rows={4}
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
                multiline
                rows={4}
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
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Synopsis
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Synopsis;
