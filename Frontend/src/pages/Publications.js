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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)', // Gradient background
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
            {initialData ? 'Edit Publication' : 'Add Publication'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Title of Publication */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title of Research Paper/Article/Book"
                  variant="outlined"
                  name="title"
                  value={publicationData.title}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Authors */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name of Author(s) / Co-author(s)"
                  variant="outlined"
                  name="authors"
                  value={publicationData.authors}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Journal/Magazine Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title of Journal/Magazine"
                  variant="outlined"
                  name="publishedIn"
                  value={publicationData.publishedIn}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Publication Type */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Publication Type</InputLabel>
                  <Select
                    name="publicationType"
                    value={publicationData.publicationType}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  >
                    <MenuItem value="UGC">UGC</MenuItem>
                    <MenuItem value="Peer Reviewed">Peer Reviewed</MenuItem>
                    <MenuItem value="Scopus">Scopus</MenuItem>
                    <MenuItem value="Web of Science">Web of Science</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Publication Date */}
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
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Publication Details */}
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
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              {/* Save Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    backgroundColor: '#3498db',
                    '&:hover': { backgroundColor: '#2980b9' },
                  }}
                >
                  {initialData ? 'Update Publication' : 'Save Publication'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default PublicationsEntry;
