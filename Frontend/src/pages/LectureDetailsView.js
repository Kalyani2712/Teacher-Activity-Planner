import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Stack, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const headers = [
  { label: 'Date', key: 'date' },
  { label: 'Division', key: 'div' },
  { label: 'Class', key: 'class' },
  { label: 'Subject', key: 'title' },
  { label: 'Lecture Topic', key: 'module' },
  { label: 'Duration', key: 'time' },
];

function LectureDetailsView({ entry_id, setEntry_id, data = [], onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate(); // Use passed-in data as default state
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    // setEntry_id(null);
    axios.get('http://localhost:5000/lecturestaken/'+localStorage.getItem('id')).then((res) => {
      if(res.status !== 404){
        setSortedData(res.data);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    })
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Division', 'Class', 'Subject', 'Lecture Topic', 'Duration']],
      body: sortedData.map((item) => [item.date, item.class, item.title, item.module, item.time]),
    });
    doc.save('lecture_details.pdf');
  };

  // Delete a lecture
  const handleDelete = (id) => {
    setSortedData(sortedData.filter((lecture) => lecture.id !== id));
    onDelete(id); // Call parent delete handler
  };

  // Edit a lecture
  const handleEdit = (updatedLecture) => {
    setEntry_id(updatedLecture.entry_id);
    navigate('/LectureDetails');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(sortedData.filter(item => item.class.toLowerCase().includes(query) || item.title.toLowerCase().includes(query)));
  };

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

  const handleAddOrEditClick = () => {
    navigate('/LectureDetails');  // Navigate to the add/edit page
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
            Lecture Details Data View
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAddOrEditClick}
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add/Edit Lecture Record
            </Button>
          </Box>

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

          {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl> */}

          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Division</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Lecture Topic</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((entry) => (
                    <TableRow
                      key={entry.id}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                        '&:hover': { backgroundColor: '#f1f1f1' },
                      }}
                    >
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.div}</TableCell>
                      <TableCell>{entry.class}</TableCell>
                      <TableCell>{entry.title}</TableCell>
                      <TableCell>{entry.module}</TableCell>
                      <TableCell>{entry.time}</TableCell>
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
                    <TableCell colSpan={6} align="center">
                      No lecture records available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

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
                <CSVLink data={sortedData} headers={headers} filename="lecture_details.csv">
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

LectureDetailsView.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

LectureDetailsView.defaultProps = {
  data: [],
};

export default LectureDetailsView;
