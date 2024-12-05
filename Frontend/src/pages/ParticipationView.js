import React, { useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const headers = [
  { label: 'Event Type', key: 'eventType' },
  { label: 'Title', key: 'title' },
  { label: 'Organization', key: 'organization' },
  { label: 'Level', key: 'level' },
  { label: 'Date', key: 'date' },
  { label: 'Details', key: 'details' },
];

function ParticipationView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Event Type', 'Title', 'Organization', 'Level', 'Date', 'Details']],
      body: data.map(item => [
        item.eventType,
        item.title,
        item.organization,
        item.level,
        item.date,
        item.details,
      ]),
    });
    doc.save('participation_data.pdf');
  };

  // Search filter handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting handler
  const handleSortChange = (column) => {
    const isAscending = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAscending ? 'desc' : 'asc');
  };

  // Sorting the data based on the selected column and direction
  const sortedData = filteredData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Handle delete
  const handleDelete = (id) => {
    onDelete(id); // Delete record from parent component
    toast.success('Record deleted successfully!'); // Notify success
  };

  // Navigate to Add/Edit Page
  const handleAddOrEditClick = () => {
    navigate('/Participation'); // Navigate to the Add/Edit page for a new or existing participation record
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#1D2B64', // Gradient background
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
            Participation Data View
          </Typography>

          {/* Add/Edit Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAddOrEditClick}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add Participation
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
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
          />

          {/* Sort Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortColumn}
              onChange={(e) => handleSortChange(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="organization">Organization</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="eventType">Event Type</MenuItem>
            </Select>
          </FormControl>

          {/* Data Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Event Type</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((entry, index) => (
                    <TableRow
                      key={entry.id}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                        '&:hover': { backgroundColor: '#f1f1f1' },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.eventType}</TableCell>
                      <TableCell>{entry.title}</TableCell>
                      <TableCell>{entry.organization}</TableCell>
                      <TableCell>{entry.level}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.details}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => onEdit(entry)}
                            sx={{ color: '#1976d2' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(entry.id)}
                            sx={{ color: '#d32f2f' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No participation records available.
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
                <CSVLink data={sortedData} headers={headers} filename="participation_data.csv">
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
}

export default ParticipationView;
