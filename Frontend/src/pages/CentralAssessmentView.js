import React, { useEffect, useState, useRef } from 'react';
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
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Notification for success

const headers = [
  { label: 'Teacher Name', key: 'teacherName' },
  { label: 'Examination Name', key: 'examinationName' },
  { label: 'Class', key: 'class' },
  { label: 'Sub/Course', key: 'subCourse' },
  { label: 'Total Sets', key: 'totalSets' },
  { label: 'Translation Required', key: 'translation' },
  { label: 'Start Date', key: 'startDate' },
  { label: 'Last Date', key: 'lastDate' },
  { label: 'Total Answer Books Assessed', key: 'totalAnswerBooksAssessed' },
  { label: 'No. of Supervisions', key: 'noOfSupervisions' },
];

function CentralAssessmentView({ data = [], onDelete, onEdit }) {
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
      head: [['Teacher Name', 'Examination Name', 'Class', 'Sub/Course', 'Total Sets', 'Translation Required', 'Start Date', 'Last Date', 'Total Answer Books Assessed', 'No. of Supervisions']],
      body: sortedData.map((item) => [
        item.teacherName,
        item.examinationName,
        item.class,
        item.subCourse,
        item.totalSets,
        item.translation,
        item.startDate,
        item.lastDate,
        item.totalAnswerBooksAssessed,
        item.noOfSupervisions,
      ]),
      styles: { halign: 'center' },
    });
    doc.save('central_assessment_data.pdf');
  };

  // Edit button click handler (from table)
  const handleEdit = (entry) => {
    onEdit(entry); // Pass data to parent component for editing
    navigate('/CentralAssessmentEdit'); // Navigate to the edit page
  };

  // Search filter handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(
      data.filter(
        (item) =>
          item.teacherName.toLowerCase().includes(query) ||
          item.examinationName.toLowerCase().includes(query)
      )
    );
  };

  // Sorting functionality
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...sortedData].sort((a, b) => {
      if (order === 'asc') {
        return a.teacherName.localeCompare(b.teacherName);
      } else {
        return b.teacherName.localeCompare(a.teacherName);
      }
    });
    setSortedData(sorted);
  };

  // Handle delete
  const handleDelete = (id) => {
    onDelete(id); // Delete record from parent component
    toast.success('Record deleted successfully!'); // Notify success
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
            Central Assessment Records View
          </Typography>

          {/* Add/Edit Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate('/CentralAssessment')}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add New Entry
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
                  <TableCell>Teacher Name</TableCell>
                  <TableCell>Examination Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Sub/Course</TableCell>
                  <TableCell>Total Sets</TableCell>
                  <TableCell>Translation Required</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Last Date</TableCell>
                  <TableCell>Total Answer Books Assessed</TableCell>
                  <TableCell>No. of Supervisions</TableCell>
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
                      <TableCell>{entry.teacherName}</TableCell>
                      <TableCell>{entry.examinationName}</TableCell>
                      <TableCell>{entry.class}</TableCell>
                      <TableCell>{entry.subCourse}</TableCell>
                      <TableCell>{entry.totalSets}</TableCell>
                      <TableCell>{entry.translation}</TableCell>
                      <TableCell>{entry.startDate}</TableCell>
                      <TableCell>{entry.lastDate}</TableCell>
                      <TableCell>{entry.totalAnswerBooksAssessed}</TableCell>
                      <TableCell>{entry.noOfSupervisions}</TableCell>
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
                    <TableCell colSpan={12} align="center">
                      No records available.
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
                <CSVLink data={sortedData} headers={headers} filename="central_assessment_data.csv">
                  Export to CSV
                </CSVLink>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                onClick={handleExportPDF}
              >
                Export to PDF
              </Button>
              <Button
                variant="outlined"
                color="primary"
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

export default CentralAssessmentView;
