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
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Required for PDF export
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Notification for success

const headers = [
  { label: 'Leave Type', key: 'leaveType' },
  { label: 'From Date', key: 'fromDate' },
  { label: 'To Date', key: 'toDate' },
  { label: 'Number of Days', key: 'numberOfDays' },
  { label: 'Reason', key: 'reason' },
];

function LeaveRecordsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();

  // States for sorting, search, and filtered data
  const [sortedData, setSortedData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Leave Type', 'From Date', 'To Date', 'Number of Days', 'Reason']],
      body: sortedData.map((item) => [
        item.leaveType,
        item.fromDate,
        item.toDate,
        item.numberOfDays,
        item.reason,
      ]),
      styles: { halign: 'center' },
    });
    doc.save('leave_records_data.pdf');
  };

  // Edit button click handler (from table)
  const handleEdit = (entry) => {
    onEdit(entry); // Pass data to parent component for editing
    navigate('/LeaveRecords'); // Navigate to the edit page
  };

  // Search filter handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(
      data.filter(
        (item) =>
          item.leaveType.toLowerCase().includes(query) ||
          item.reason.toLowerCase().includes(query)
      )
    );
  };

  // Sorting functionality (by Leave Type)
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...sortedData].sort((a, b) => {
      if (order === 'asc') {
        return a.leaveType.localeCompare(b.leaveType);
      } else {
        return b.leaveType.localeCompare(a.leaveType);
      }
    });
    setSortedData(sorted);
  };

  // Handle delete
  const handleDelete = (id) => {
    onDelete(id); // Delete record from parent component
    toast.success('Record deleted successfully!'); // Notify success
  };

  // Navigate to Add/Edit page
  const handleAddOrEditClick = () => {
    navigate('/LeaveRecords'); // Navigate to the add/edit page for a new entry
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
            Leave Records Data View
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
              Add/Edit Leave Record
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
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>Number of Days</TableCell>
                  <TableCell>Reason</TableCell>
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
                      <TableCell>{entry.leaveType}</TableCell>
                      <TableCell>{entry.fromDate}</TableCell>
                      <TableCell>{entry.toDate}</TableCell>
                      <TableCell>{entry.numberOfDays}</TableCell>
                      <TableCell>{entry.reason}</TableCell>
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
                    <TableCell colSpan={7} align="center">
                      No leave records available.
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
                <CSVLink
                  data={sortedData}
                  headers={headers}
                  filename="leave_records_data.csv"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Export to CSV
                </CSVLink>
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="small"
                sx={{
                  '&:hover': { backgroundColor: '#ffebee' },
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                onClick={handleExportPDF}
              >
                Export to PDF
              </Button>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  '&:hover': { backgroundColor: '#e3f2fd' },
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

LeaveRecordsView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      leaveType: PropTypes.string.isRequired,
      fromDate: PropTypes.string.isRequired,
      toDate: PropTypes.string.isRequired,
      numberOfDays: PropTypes.number.isRequired,
      reason: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default LeaveRecordsView;
