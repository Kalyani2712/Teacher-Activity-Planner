import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PublicationsEntry({ onSave, initialData }) {
  const [publicationData, setPublicationData] = useState({
    publicationType: '',
    title: '',
    authors: '',
    publishedIn: '',
    publicationDate: '',
    details: '',
  });

  const navigate = useNavigate();

  // Load initial data if editing
  React.useEffect(() => {
    if (initialData) {
      setPublicationData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicationData({ ...publicationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(publicationData);
    navigate('/PublicationsView'); // Redirect after save
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>{initialData ? 'Edit Publication' : 'Add Publication'}</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title of Research Paper/Article/Book"
                variant="outlined"
                name="title"
                value={publicationData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name of Author(s) / Co-author(s)"
                variant="outlined"
                name="authors"
                value={publicationData.authors}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title of Journal/Magazine"
                variant="outlined"
                name="publishedIn"
                value={publicationData.publishedIn}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Publication Type</InputLabel>
                <Select
                  name="publicationType"
                  value={publicationData.publicationType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="UGC">UGC</MenuItem>
                  <MenuItem value="Peer Reviewed">Peer Reviewed</MenuItem>
                  <MenuItem value="Scopus">Scopus</MenuItem>
                  <MenuItem value="Web of Science">Web of Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Publication Date"
                variant="outlined"
                name="publicationDate"
                type="date"
                value={publicationData.publicationDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details"
                variant="outlined"
                name="details"
                value={publicationData.details}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {initialData ? 'Update Publication' : 'Save Publication'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default PublicationsEntry;
