import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Stack, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const headers = [
  { label: 'Class', key: 'class' },
  { label: 'Planned Topics', key: 'plannedTopics' },
  { label: 'Topics Covered', key: 'topicsCovered' },
  { label: 'Deviations', key: 'deviations' },
  { label: 'Comments', key: 'comments' },
];

const SynopsisView = ({ data = [], onDelete, onEdit }) => {
  const printRef = useRef();
  const navigate = useNavigate();

  const [sortedData, setSortedData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Class', 'Planned Topics', 'Topics Covered', 'Deviations', 'Comments']],
      body: sortedData.map((item) => [
        item.class,
        item.plannedTopics,
        item.topicsCovered,
        item.deviations,
        item.comments,
      ]),
      styles: { halign: 'center' },
    });
    doc.save('synopsis_data.pdf');
  };

  // Edit button click handler
  const handleEdit = (entry) => {
    onEdit(entry);
    navigate(`/Synopsis/${entry.id}`);
  };

  // Search filter handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(
      data.filter(
        (item) =>
          item.class.toLowerCase().includes(query) ||
          item.plannedTopics.toLowerCase().includes(query)
      )
    );
  };

  // Sorting functionality (by Class)
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...sortedData].sort((a, b) => {
      if (order === 'asc') {
        return a.class.localeCompare(b.class);
      } else {
        return b.class.localeCompare(a.class);
      }
    });
    setSortedData(sorted);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await onDelete(id); // Assuming onDelete is a promise-based function
      toast.success('Record deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete the record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#1D2B64',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Synopsis Records View
          </Typography>

          {/* Add/Edit Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate('/Synopsis')}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add/Edit Synopsis
            </Button>
          </Box>

          {/* Search Bar */}
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  🔍
                </InputAdornment>
              ),
            }}
          />

          {/* Sort Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          {/* Data Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Planned Topics</TableCell>
                  <TableCell>Topics Covered</TableCell>
                  <TableCell>Deviations</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.class}</TableCell>
                      <TableCell>{entry.plannedTopics}</TableCell>
                      <TableCell>{entry.topicsCovered}</TableCell>
                      <TableCell>{entry.deviations}</TableCell>
                      <TableCell>{entry.comments}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton onClick={() => handleEdit(entry)} sx={{ color: '#1976d2' }}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(entry.id)} sx={{ color: '#d32f2f' }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No synopsis records available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Export Buttons */}
          <Box sx={{ marginTop: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
              >
                <CSVLink data={sortedData} headers={headers} filename="synopsis_data.csv">
                  Export to CSV
                </CSVLink>
              </Button>
              <Button
                variant="outlined"
                color="success"
                size="small"
                sx={{
                  '&:hover': { backgroundColor: '#e8f5e9' },
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                onClick={handleExportPDF}
              >
                Export to PDF
              </Button>
              <Button
                variant="outlined"
                color="success"
                size="small"
                sx={{
                  '&:hover': { backgroundColor: '#e8f5e9' },
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                onClick={handlePrint}
              >
                Print
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

SynopsisView.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

SynopsisView.defaultProps = {
  data: [],
};

export default SynopsisView;
