import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
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
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const headers = [
  { label: 'Course Name', key: 'courseName' },
  { label: 'Platform', key: 'platform' },
  { label: 'Completion Date', key: 'completionDate' },
  { label: 'Certificate Link', key: 'certificateLink' },
];

function MOOCsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState(data);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Course Name', 'Platform', 'Completion Date', 'Certificate Link']],
      body: filteredData.map((item) => [
        item.courseName,
        item.platform,
        item.completionDate,
        item.certificateLink,
      ]),
    });
    doc.save('moocs_data.pdf');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredData(
      data.filter(
        (item) =>
          item.courseName.toLowerCase().includes(query) ||
          item.platform.toLowerCase().includes(query)
      )
    );
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...filteredData].sort((a, b) =>
      order === 'asc' ? a.courseName.localeCompare(b.courseName) : b.courseName.localeCompare(a.courseName)
    );
    setFilteredData(sorted);
  };

  const handleEdit = (entry) => {
    onEdit(entry);
    navigate('/MOOCsContent'); // Navigate to add/edit page
  };

  const handleAddClick = () => {
    navigate('/MOOCsContent'); // Navigate to add new course
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
            MOOCs Data View
          </Typography>

          {/* Add Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAddClick}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add MOOC
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

          {/* Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Completion Date</TableCell>
                  <TableCell>Certificate Link</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.courseName}</TableCell>
                      <TableCell>{entry.platform}</TableCell>
                      <TableCell>{entry.completionDate}</TableCell>
                      <TableCell>
                        <a href={entry.certificateLink} target="_blank" rel="noopener noreferrer">
                          View Certificate
                        </a>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(entry)}
                            sx={{ color: '#1976d2' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onDelete(entry.id)}
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
                    <TableCell colSpan={6} align="center">
                      No MOOCs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Export Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              <CSVLink
                data={filteredData}
                headers={headers}
                filename="moocs_data.csv"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Export to CSV
              </CSVLink>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleExportPDF}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Export to PDF
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handlePrint}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Print
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

MOOCsView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseName: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
      completionDate: PropTypes.string.isRequired,
      certificateLink: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default MOOCsView;
