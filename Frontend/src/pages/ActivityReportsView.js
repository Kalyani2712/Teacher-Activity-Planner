import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Stack,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';

function ActivityReportsView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activityData, setActivityData] = useState(
    state?.formData ? [{ ...state.formData, id: Math.random() }] : []
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...activityData].sort((a, b) => {
      if (order === 'asc') {
        return a.activityType.localeCompare(b.activityType);
      } else {
        return b.activityType.localeCompare(a.activityType);
      }
    });
    setActivityData(sorted);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Activity Type', 'Title', 'Objectives', 'Students Attended', 'Date']],
      body: activityData.map((entry) => [
        entry.activityType,
        entry.title,
        entry.objectives,
        entry.studentsAttended,
        entry.date,
      ]),
    });
    doc.save('activity_report.pdf');
  };

  const handleEdit = (entry) => {
    navigate('/ActivityReports', { state: { formData: entry } });
  };

  const handleDelete = (id) => {
    const updatedData = activityData.filter((entry) => entry.id !== id);
    setActivityData(updatedData);
    toast.success('Record deleted successfully!');
  };

  const filteredData = activityData.filter((entry) =>
    Object.values(entry).some((val) => val?.toString().toLowerCase().includes(searchTerm))
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Activity Reports View
          </Typography>

          {/* Search */}
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
          />

          {/* Sort Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              label="Sort By"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          {/* Table */}
          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity Type</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Objectives</TableCell>
                  <TableCell>Students Attended</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.activityType}</TableCell>
                    <TableCell>{entry.title}</TableCell>
                    <TableCell>{entry.objectives}</TableCell>
                    <TableCell>{entry.studentsAttended}</TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => handleEdit(entry)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(entry.id)} color="error">
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Export and Add New */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              onClick={handleExportPDF}
              sx={{ fontWeight: 'bold' }}
            >
              Export PDF
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate('/ActivityReports', { state: { formData: {} } })
              }
            >
              Add New Report
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default ActivityReportsView;
