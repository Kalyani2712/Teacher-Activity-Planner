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
  { label: 'Publication Type', key: 'publicationType' },
  { label: 'Title', key: 'title' },
  { label: 'Authors', key: 'authors' },
  { label: 'Published In', key: 'publishedIn' },
  { label: 'Publication Date', key: 'publicationDate' },
  { label: 'Details', key: 'details' },
];

function PublicationsView({ data, onDelete, onEdit }) {
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
      head: [['Publication Type', 'Title', 'Authors', 'Published In', 'Publication Date', 'Details']],
      body: filteredData.map((item) => [
        item.publicationType,
        item.title,
        item.authors,
        item.publishedIn,
        item.publicationDate,
        item.details,
      ]),
    });
    doc.save('publications_data.pdf');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredData(
      data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.authors.toLowerCase().includes(query)
      )
    );
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...filteredData].sort((a, b) =>
      order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setFilteredData(sorted);
  };

  const handleEdit = (entry) => {
    onEdit(entry);
    navigate('/Publications'); // Navigate to add/edit page
  };

  const handleAddClick = () => {
    navigate('/Publications'); // Navigate to add new publication
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
            Publications Data View
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
              Add Publication
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
                  <TableCell>Publication Type</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Authors</TableCell>
                  <TableCell>Published In</TableCell>
                  <TableCell>Publication Date</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.publicationType}</TableCell>
                      <TableCell>{entry.title}</TableCell>
                      <TableCell>{entry.authors}</TableCell>
                      <TableCell>{entry.publishedIn}</TableCell>
                      <TableCell>{entry.publicationDate}</TableCell>
                      <TableCell>{entry.details}</TableCell>
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
                    <TableCell colSpan={8} align="center">
                      No publications found.
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
                filename="publications_data.csv"
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

PublicationsView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      publicationType: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      publishedIn: PropTypes.string.isRequired,
      publicationDate: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PublicationsView;
