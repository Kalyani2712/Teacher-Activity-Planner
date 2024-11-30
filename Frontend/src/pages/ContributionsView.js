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
  const [sortColumn, setSortColumn] = useState('title'); // Default sorting by title
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Contribution Type', 'Title', 'Organization', 'Level', 'Date', 'Details']],
      body: data.map(item => [
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

  // Navigate to Add/Edit Page (like Leave Records)
  const handleAddOrEditClick = () => {
    navigate('/Contributions'); // Navigate to the Add/Edit page for a new or existing contribution
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: '10px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Contribution Data View
        </Typography>

        {/* Add/Edit Button */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrEditClick}
            size="small"
            sx={{ fontWeight: 'bold', borderRadius: '5px' }}
          >
            Add Contribution
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
            <MenuItem value="contributionType">Contribution Type</MenuItem>
          </Select>
        </FormControl>

        {/* Table */}
        <TableContainer component={Paper} ref={printRef} sx={{ borderRadius: '8px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Sr. No.</TableCell>
                <TableCell>
                  <Button onClick={() => handleSortChange('contributionType')} sx={{ color: '#fff' }}>
                    Contribution Type
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleSortChange('title')} sx={{ color: '#fff' }}>
                    Title
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleSortChange('organization')} sx={{ color: '#fff' }}>
                    Organization
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleSortChange('level')} sx={{ color: '#fff' }}>
                    Level
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleSortChange('date')} sx={{ color: '#fff' }}>
                    Date
                  </Button>
                </TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((entry, index) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Export Buttons */}
        <Box sx={{ marginTop: 3 }}>
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
  );
}

export default ContributionsView;
