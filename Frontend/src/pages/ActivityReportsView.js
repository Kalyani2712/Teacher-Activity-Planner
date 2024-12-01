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
    <Container maxWidth="xl">
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Activity Reports
        </Typography>

        {/* Search and Add New Record */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 3,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Search Records"
            variant="outlined"
            onChange={handleSearch}
            fullWidth
            sx={{ maxWidth: '300px', marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate('/ActivityReports', { state: { formData: {} } })
            }
            sx={{ marginLeft: 2, height: 'fit-content', borderRadius: 2 }}
          >
            Add New Activity Report
          </Button>
        </Box>

        {/* Sort Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
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

        {/* Table with scroll on smaller screens */}
        <TableContainer
          component={Paper}
          ref={printRef}
          sx={{
            maxHeight: '500px',
            overflow: 'auto',
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Activity Type
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Objectives
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Students Attended
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((entry) => (
                  <TableRow
                    key={entry.id}
                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                  >
                    <TableCell>{entry.activityType}</TableCell>
                    <TableCell>{entry.title}</TableCell>
                    <TableCell>{entry.objectives}</TableCell>
                    <TableCell>{entry.studentsAttended}</TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(entry)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(entry.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ color: 'text.secondary' }}
                  >
                    No activity reports available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Export and Print Buttons */}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              <CSVLink
                data={filteredData}
                headers={[
                  { label: 'Activity Type', key: 'activityType' },
                  { label: 'Title', key: 'title' },
                  { label: 'Objectives', key: 'objectives' },
                  { label: 'Students Attended', key: 'studentsAttended' },
                  { label: 'Date', key: 'date' },
                ]}
                filename="activity_reports.csv"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Export to CSV
              </CSVLink>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ borderRadius: 2 }}
              onClick={handleExportPDF}
            >
              Export to PDF
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2 }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default ActivityReportsView;
