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
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Contribution Type', key: 'contributionType' },
  { label: 'Title', key: 'title' },
  { label: 'Organization', key: 'organization' },
  { label: 'Level', key: 'level' },
  { label: 'Date', key: 'date' },
  { label: 'Details', key: 'details' },
];

function ContributionsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('title'); // Default sort column
  const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Contribution Type', 'Title', 'Organization', 'Level', 'Date', 'Details']],
      body: data.map((item) => [
        item.contributionType,
        item.title,
        item.organization,
        item.level,
        item.date,
        item.details,
      ]),
    });
    doc.save('contributions_data.pdf');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (column) => {
    const isAscending = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAscending ? 'desc' : 'asc');
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.organization.toLowerCase().includes(searchTerm)
  );

  const sortedData = filteredData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAddOrEditClick = () => {
    navigate('/Contributions');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1D2B64, #F8CDDA)', // Gradient background
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Contributions Data View
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
              Add Contribution
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
            <Select value={sortColumn} onChange={(e) => handleSortChange(e.target.value)}>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="organization">Organization</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="contributionType">Contribution Type</MenuItem>
            </Select>
          </FormControl>

          {/* Data Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Contribution Type</TableCell>
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
                    <TableRow key={entry.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.contributionType}</TableCell>
                      <TableCell>{entry.title}</TableCell>
                      <TableCell>{entry.organization}</TableCell>
                      <TableCell>{entry.level}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.details}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton color="primary" onClick={() => onEdit(entry)}>
                            <Edit />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => onDelete(entry.id)}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No contributions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Export Buttons */}
          <Box>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary">
                <CSVLink
                  data={sortedData}
                  headers={headers}
                  filename="contributions_data.csv"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
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
    </Box>
  );
}

export default ContributionsView;
