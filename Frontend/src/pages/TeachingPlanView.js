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
  Grid
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Required for PDF export
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Notification for success
import axios from 'axios';
const headers = [
  { label: 'Lecture No', key: 'lecNo' },
  { label: 'Topic', key: 'topic' },
  { label: 'Sub-Topic', key: 'subTopic' },
  { label: 'Actual Date', key: 'actualDate' },
  { label: 'Planned Date', key: 'plannedDate' },
];


function TeachingPlanView({ month, year, className, semester, setMonth, setYear, setClassName, setSemester,
  onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();

  // States for sorting, search, and filtered data
  const [sortedData, setSortedData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    axios.put('http://localhost:5000/lectures/'+localStorage.getItem('id'), {month: month, year: year, className: className, semester: semester}).then((response) => {
      setNewData(response.data);
      setSortedData(JSON.parse(response.data[0].lectureDetails));
      console.log(newData);
      console.log(response.data);
    }).catch((error) => {
      setSortedData([]);
      console.log(month, year, className, semester);
      console.log(error);
    });
  }, [month, year, className, semester]);

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Lecture No', 'Topic', 'Sub-Topic', 'Planned Date', 'Actual Date']],
      body: sortedData.map((item) => [
        item.lecNo,
        item.topic,
        item.subTopic,
        item.plannedDate,
        item.actualDate
      ]),
      styles: { halign: 'center' },
    });
    doc.save('teaching_plan_data.pdf');
  };

  // Edit button click handler (from table)
  const handleEdit = (entry) => {
    onEdit(entry); // Pass data to parent component for editing
    navigate('/TeachingPlan'); // Navigate to the edit page
  };

  // Search filter handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(
      JSON.parse(newData[0].lectureDetails).filter(
        (item) =>
          item.subTopic.toLowerCase().includes(query) ||
          item.plannedDate.toLowerCase().includes(query) ||
          item.lecNo.toLowerCase().includes(query)
      )
    );
  };

  // Sorting functionality
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...sortedData].sort((a, b) => {
      if (order === 'asc') {
        return a.year.localeCompare(b.year);
      } else {
        return b.year.localeCompare(a.year);
      }
    });
    setSortedData(sorted);
  };



  // Navigate to Add/Edit page
  const handleAddOrEditClick = () => {
    navigate('/TeachingPlan'); // Navigate to the add/edit page for a new entry
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1c1c3c', // Dark Navy Blue background
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
            Teaching Plan Data View
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
              Add/Edit Teaching Plan
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
                <InputAdornment position="start">🔍</InputAdornment>
              ),
            }}
          />

          {/* add month, year, class, semester filter in grid the input will be text*/}
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  value={month}
                  label="Month"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <MenuItem value="January">January</MenuItem>
                  <MenuItem value="February">February</MenuItem>
                  <MenuItem value="March">March</MenuItem>
                  <MenuItem value="April">April</MenuItem>
                  <MenuItem value="May">May</MenuItem>
                  <MenuItem value="June">June</MenuItem>
                  <MenuItem value="July">July</MenuItem>
                  <MenuItem value="August">August</MenuItem>
                  <MenuItem value="September">September</MenuItem>
                  <MenuItem value="October">October</MenuItem>
                  <MenuItem value="November">November</MenuItem>
                  <MenuItem value="December">December</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Year"
                variant="outlined"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Class</InputLabel>
                <Select
                  labelId="class-label"
                  value={className}
                  label="Class"
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <MenuItem value="FY">FY</MenuItem>
                  <MenuItem value="SY">SY</MenuItem>
                  <MenuItem value="TY">TY</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Semester</InputLabel>
                <Select
                  labelId="semester-label"
                  value={semester}
                  label="Semester"
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <MenuItem value="Semester 1">Semester 1</MenuItem>
                  <MenuItem value="Semester 2">Semester 2</MenuItem>
                  <MenuItem value="Semester 3">Semester 3</MenuItem>
                  <MenuItem value="Semester 4">Semester 4</MenuItem>
                  <MenuItem value="Semester 5">Semester 5</MenuItem>
                  <MenuItem value="Semester 6">Semester 6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Sort Dropdown */}
          {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By Year</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl> */}

          {/* add a title of the paper and paper no from newdata var */}
          {newData.length > 0 ? (
            <Typography variant="h6" gutterBottom>
              <pre>Course: {newData[0].course}   |  Title: {newData[0].title}   |   Paper No: {newData[0].paperNo}</pre>
            </Typography>
          ): null}

          {/* Data Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lecture No</TableCell>
                  <TableCell>Topic</TableCell>
                  <TableCell>Sub-Topic</TableCell>
                  <TableCell>Planned Date</TableCell>
                  <TableCell>Actual Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.lecNo}</TableCell>
                      <TableCell>{entry.topic}</TableCell>
                      <TableCell>{entry.subTopic}</TableCell>
                      <TableCell>{entry.plannedDate}</TableCell>
                      <TableCell>{entry.actualDate}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(entry)}
                            sx={{ color: '#1976d2' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No teaching plans available.
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
                  filename="teaching_plan_data.csv"
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

export default TeachingPlanView;
