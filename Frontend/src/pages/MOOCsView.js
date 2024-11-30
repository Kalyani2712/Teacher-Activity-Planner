import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, TextField, InputAdornment, TablePagination, TableSortLabel } from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Programme Name', key: 'programmeName' },
  { label: 'Course Name', key: 'courseName' },
  { label: 'MOOCs Title', key: 'title' },
  { label: 'ICT Resources', key: 'ictResources' },
  { label: 'Date Implemented/Approved', key: 'dateImplemented' },
  { label: 'Content Type', key: 'contentType' },
  { label: 'Details', key: 'details' },
];

function MOOCsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const history = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('programmeName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF functionality
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Programme Name', 'Course Name', 'MOOCs Title', 'ICT Resources', 'Date Implemented/Approved', 'Content Type', 'Details']],
      body: data.map(item => [item.programmeName, item.courseName, item.title, item.ictResources, item.dateImplemented, item.contentType, item.details]),
    });
    doc.save('moocs_and_e_content.pdf');
  };

  // Handling search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sorting handler
  const handleSortRequest = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  // Handle edit action
  const handleEdit = (entry) => {
    onEdit(entry);
    history(`/MOOCsContent/${entry.id}`);
  };

  // Handle Add New button click
  const handleAddNew = () => {
    history('/MOOCsContent');
  };

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item.programmeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ictResources.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the data based on the selected column and order
  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>MOOCs and E-content Data View</Typography>

        <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleAddNew}>
          <Add /> Add New
        </Button>

        {/* Search bar */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ marginBottom: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Table for displaying data */}
        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'programmeName'}
                    direction={sortBy === 'programmeName' ? sortOrder : 'asc'}
                    onClick={() => handleSortRequest('programmeName')}
                  >
                    Programme Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'courseName'}
                    direction={sortBy === 'courseName' ? sortOrder : 'asc'}
                    onClick={() => handleSortRequest('courseName')}
                  >
                    Course Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'title'}
                    direction={sortBy === 'title' ? sortOrder : 'asc'}
                    onClick={() => handleSortRequest('title')}
                  >
                    MOOCs Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>ICT Resources</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'dateImplemented'}
                    direction={sortBy === 'dateImplemented' ? sortOrder : 'asc'}
                    onClick={() => handleSortRequest('dateImplemented')}
                  >
                    Date Implemented/Approved
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.programmeName}</TableCell>
                  <TableCell>{entry.courseName}</TableCell>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.ictResources}</TableCell>
                  <TableCell>{entry.dateImplemented}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(entry)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(entry.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />

        {/* Export buttons */}
        <Box sx={{ marginTop: 3 }}>
          <Button variant="outlined" color="primary" sx={{ marginRight: 2 }}>
            <CSVLink data={data} headers={headers} filename="moocs_and_e_content.csv">
              Export to CSV
            </CSVLink>
          </Button>
          <Button variant="outlined" color="secondary" sx={{ marginRight: 2 }} onClick={handleExportPDF}>
            Export to PDF
          </Button>
          <Button variant="outlined" sx={{ marginRight: 2 }} onClick={handlePrint}>
            Print
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MOOCsView;
