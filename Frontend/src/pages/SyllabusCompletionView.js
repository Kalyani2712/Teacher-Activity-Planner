import React, { useState, useRef, useEffect } from 'react';
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
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Notification for success
import axios from 'axios';

const headers = [
  { label: 'Class Name', key: 'className' },
  { label: 'Semester', key: 'semester' },
  { label: 'Paper No', key: 'paperNo' },
  { label: 'Paper Title', key: 'paperTitle' },
  { label: 'Month', key: 'month' },
  { label: 'Syllabus Planned', key: 'syllabusPlanned' },
  { label: 'Syllabus Remained', key: 'syllabusRemained' },
  { label: 'Remark', key: 'remark' },
];

function SyllabusCompletionView({ data = [], onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();

  // States for sorting, search, and filtered data
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:5000/lectures/'+localStorage.getItem('id')).then((res) => {
      setSortedData([{
        className: res.data[0].class,
        semester: res.data[0].semester,
        paperNo: res.data[0].paperNo,
        paperTitle: res.data[0].course,
        month: res.data[0].month,
        syllabusPlanned: res.data[0].title,
        syllabusRemained: null,
        remark: JSON.parse(res.data[0].lectureDetails).filter((lecture) => lecture.remark !== "completed").length > 0 ? "Not Completed" : "Completed"
      }]);
    })
  }, []);

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Class Name', 'Semester', 'Paper No', 'Paper Title', 'Month', 'Syllabus Planned', 'Syllabus Remained', 'Remark']],
      body: sortedData.map((item) => [
        item.className,
        item.semester,
        item.paperNo,
        item.paperTitle,
        item.month,
        item.syllabusPlanned,
        item.syllabusRemained,
        item.remark,
      ]),
      styles: { halign: 'center' },
    });
    doc.save('syllabus_records_data.pdf');
  };

  // Edit button click handler (from table)
  const handleEdit = (entry) => {
    onEdit(entry); // Pass data to parent component for editing
    navigate('/SyllabusReport'); // Navigate to the edit page
  };

  // Search filter handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(
      data.filter(
        (item) =>
          item.className.toLowerCase().includes(query) ||
          item.paperTitle.toLowerCase().includes(query)
      )
    );
  };

  // Sorting functionality (by Class Name)
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...sortedData].sort((a, b) => {
      if (order === 'asc') {
        return a.className.localeCompare(b.className);
      } else {
        return b.className.localeCompare(a.className);
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
    navigate('/SyllabusReport'); // Navigate to the add/edit page for a new entry
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
            Syllabus Completion Records View
          </Typography>

          {/* Add/Edit Button */}
          {/* <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAddOrEditClick}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add/Edit Syllabus Record
            </Button>
          </Box> */}

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
          {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl> */}

          {/* Data Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Class Name</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Paper No</TableCell>
                  <TableCell>Paper Title</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Syllabus Planned</TableCell>
                  <TableCell>Remark</TableCell>
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
                      <TableCell>{entry.className}</TableCell>
                      <TableCell>{entry.semester}</TableCell>
                      <TableCell>{entry.paperNo}</TableCell>
                      <TableCell>{entry.paperTitle}</TableCell>
                      <TableCell>{entry.month}</TableCell>
                      <TableCell>{entry.syllabusPlanned}</TableCell>
                      <TableCell>{entry.remark}</TableCell>
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
                    <TableCell colSpan={10} align="center">
                      No syllabus records available.
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
                <CSVLink data={sortedData} headers={headers} filename="syllabus_records_data.csv">
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

SyllabusCompletionView.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

SyllabusCompletionView.defaultProps = {
  data: [],
};

export default SyllabusCompletionView;
