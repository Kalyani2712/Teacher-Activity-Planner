import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Stack, TextField, InputAdornment } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Publication Type', key: 'publicationType' },
  { label: 'Title', key: 'title' },
  { label: 'Authors', key: 'authors' },
  { label: 'Published In', key: 'publishedIn' },
  { label: 'Publication Date', key: 'publicationDate' },
  { label: 'Details', key: 'details' },
];

function PublicationsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Publication Type', 'Title', 'Authors', 'Published In', 'Publication Date', 'Details']],
      body: data.map(item => [
        item.publicationType, item.title, item.authors, item.publishedIn, item.publicationDate, item.details,
      ]),
    });
    doc.save('publications_data.pdf');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (entry) => {
    onEdit(entry);
    navigate('/Publications'); // Navigate to the Publications Entry page for editing
  };

  const handleAddClick = () => {
    navigate('/Publications'); // Navigate to the Publications Entry page for adding a new entry
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Publications Data View
        </Typography>

        {/* Add/Edit Button */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClick}
            size="small"
            sx={{ fontWeight: 'bold', borderRadius: '5px', boxShadow: 1 }}
          >
            Add Publication
          </Button>
        </Box>

        {/* Search Box */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
          }}
        />

        <TableContainer component={Paper} ref={printRef}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Sr. No.</TableCell>
                <TableCell>Publication Type</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Published In</TableCell>
                <TableCell>Publication Date</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.publicationType}</TableCell>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.authors}</TableCell>
                  <TableCell>{entry.publishedIn}</TableCell>
                  <TableCell>{entry.publicationDate}</TableCell>
                  <TableCell>{entry.details}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary" onClick={() => handleEdit(entry)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => onDelete(entry.id)}>
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Export Buttons */}
        <Box sx={{ marginTop: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="primary">
              <CSVLink data={filteredData} headers={headers} filename="publications_data.csv">
                Export to CSV
              </CSVLink>
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleExportPDF}>
              Export to PDF
            </Button>
            <Button variant="outlined" onClick={handlePrint}>
              Print
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default PublicationsView;
