import React, { useRef } from 'react';
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
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Committee Name', key: 'committeeName' },
  { label: 'Role', key: 'role' },
  { label: 'Level', key: 'level' },
  { label: 'Description', key: 'description' },
];

const CommitteeWorkView = ({ data, onDelete, onEdit }) => {
  const printRef = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  // Handle Print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Committee Name', 'Role', 'Level', 'Description']],
      body: filteredData.map((item) => [
        item.committeeName,
        item.role,
        item.level,
        item.description,
      ]),
    });
    doc.save('committee_work_data.pdf');
  };

  // Navigate to Add/Edit page
  const handleAddOrEditClick = (entry) => {
    navigate('/committees', { state: { entry } }); // Pass entry for editing
  };

  // Handle Search
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredData(
      data.filter(
        (item) =>
          item.committeeName.toLowerCase().includes(searchValue) ||
          item.role.toLowerCase().includes(searchValue) ||
          item.level.toLowerCase().includes(searchValue) ||
          item.description.toLowerCase().includes(searchValue)
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
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
            Committee Work Data View
          </Typography>

          {/* Add Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddOrEditClick(null)}
            >
              Add Committee Work
            </Button>
          </Box>

          {/* Search Bar */}
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* Data Table */}
          <TableContainer component={Paper} ref={printRef}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Committee Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                        '&:hover': { backgroundColor: '#f1f1f1' },
                      }}
                    >
                      <TableCell>{entry.committeeName}</TableCell>
                      <TableCell>{entry.role}</TableCell>
                      <TableCell>{entry.level}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleAddOrEditClick(entry)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => onDelete(entry.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No committee work records available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Export Buttons */}
          <Box sx={{ marginTop: 3 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary">
                <CSVLink
                  data={filteredData}
                  headers={headers}
                  filename="committee_work_data.csv"
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
};

CommitteeWorkView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      committeeName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CommitteeWorkView;
